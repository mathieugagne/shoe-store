jQuery(document).on 'turbolinks:load', ->
  update_window = $('#update-window')

  App.inventory_stream = App.cable.subscriptions.create {
    channel: "InventoryUpdatesChannel"
  },
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    if data['new_quantity'] > data['old_quantity']
      data['severity'] = 'restored'
      data['message'] = 'Quantity Replenished:'
    if data['severity'] == 'error' || data['severity'] == 'warn' || data['severity'] == 'restored'
      update_window.append "<div class=#{data['severity']}>#{data['message']}: <ul><li>Store: #{data['store']}</li><li>Model: #{data['sku']}</li><li>Current Inventory: #{data['new_quantity']}</li></ul></div>"
      update_window.scrollTop(update_window.prop("scrollHeight"))
      if data['chart_data']
        chart = $('#inventory-chart-' + data['chart_data']['store_id'])
        if chart.length
          chart.get(0).__chartist__.update(labels: data['chart_data']['labels'], series: [data['chart_data']['data']])
        else
          # we need to insert the HTML for the store and then initialize a new chart.
          # in a prod environment we'd use view partials and modularize the JS to do this for DRYness
          # Today, though, I'm running out of time so I'm just copy-pasting to show you the rough point.
          chart_container = $('#store-charts')
          chart_container.append "<div class=\"store-chart\" data-name=\"#{data['store']}\" id=\"store-chart-#{data['chart_data']['store_id']}\">" +
                        "<div class=\"name\">#{data['store']}</div>" +
                        "<div class=\"ct-chart ct-perfect-fourth\" id=\"inventory-chart-#{data['chart_data']['store_id']}\" />" +
                        "</div>"

          # Initialize the new chart object
          new Chartist.Bar "#inventory-chart-#{data['chart_data']['store_id']}", {
            labels: data['chart_data']['labels'],
            series: [data['chart_data']['data']]
          },
          seriesBarDistance: 10,
          reverseData: true,
          horizontalBars: true,
          axisY: {
            offset: 70
          }

          # And, for giggles, let's sort them by store name, as they were initially
          # Could be more advanced and insert this in the right order to start with,
          # but just to show we can do it after if we like...
          charts = chart_container.find('.store-chart')
          charts.detach().sort (a, b) ->
            if $(a).data('name') > $(b).data('name') then 1 else -1
          chart_container.append(charts)
