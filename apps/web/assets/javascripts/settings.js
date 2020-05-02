$('document').ready(function() {
  return $('#edit').click(function() {
    const high = $('#settings-high-limit').val();
    const low = $('#settings-critical-limit').val();

    return $.ajax({
      url: 'settings',
      type: 'post',
      data: { settings: { high_limit: high, critical_limit: low } },
      complete: function(data) {
        updateValues(low, high);
        cleanInput();
      }
    });
  });
});

function updateValues(low, high) {
  if (low !== '') {
    $('.critical_limit_value').text(low);
    $('.critical_limit_settings').text(low);

  };
  if (high !== '') {
    $('.high_limit_value').text(high);
    $('.high_limit_settings').text(low);
  };
};

function cleanInput() {
  $('#settings-high-limit').val('');
  $('#settings-critical-limit').val('');
};
