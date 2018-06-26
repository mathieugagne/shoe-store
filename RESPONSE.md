# Response to Shoe-Store challenge

Hello PotLoc'ers, here's my response to your shoe store challenge. I didn't have a lot of time today to work on it, so I deliberately compromised in some areas in order to open others for discussion.

A few thoughts before we dive in:
* I'm not a front-end programmer by any means. I've thrown together the front end here to demonstrate various ways to think about the problem and for you to see a few different approaches I took to dealing with the data - and also just to have something nice to look at. So please don't nitpick my coffeescript or JS too much - it's really not my strength (although I used to be rather good at it and could get there again if I needed to.)
* This was done in just a few hours on my Sunday afternoon, including this documentation. During the time, I had to make lunch ad dinner for my family, take care of a variety of personal tasks, etc. As a result, there may be obvious things I've missed. If you find them, feel free to point them out and we'll discuss! Just know that I know it's not perfect code (and that's a great question: when is code 'done'?).

## Get it running

I chose Rails partly because I'm rather familiar with it at this point and partly because there were some interesting mechanisms it offered that I could leverage to show some other things quickly. I didn't need Rails (or Ruby, for that matter), but it's a fast way to get started. So, all you should really need to do is:

* Fire up your websocketd instance serving up your own data.
* `bundle`
* `rails db:migrate`
* `rails s`
* `open http://localhost:3000`

If you want to run the simple tests I've provided, `rails test` should do it.

If you get any fussing about assets you can trigger a precompilation (I forgot to include that in the .gitignore so you may benefit from my precompilation too), but I doubt that will be necessary in the dev environment.

This works out of the box on a Mac, since the sqlite DB that's included is sufficient for Rails to get up and running. Any reasonably recent Ruby should run it (I ran it on 2.4.1). I did not need to use homebrew to install anything, nor explicitly configure a DB.

## What you should see

If it works, you should see a very basic twitter-bootstrap dashboard page with a little feed on the right displaying alerts, and a series of charts which are progressively filling in with data as the inventory status updates.

*A little note: Yes, I know all the inventory bars are the same colour. If I had more time I'd implement the JS event handling to draw them red, yellow, or green based on stock quantity and direction of last change.*

## Things to note

* The page will reload with the cached inventory data from the DB if you refresh it, catching up to the last known state.
* I'm using ActiveCable here, which is a quick and dirty implementation of websockets. I could have used a JSON-based API layer and web polling, or a naiive implementation of websockets, persistent HTTP 2 push, etc.
* I've hand-written the ActiveCable data format, but in production I prefer to use serializers and, if pushing raw JS, view partials.
* I haven't nearly tested enough here, just enough to give you a sense of where I started from the design perspective. I'm aware of this and it was a compromise I chose in order to flesh out the concept further in the very limited time I have.
* I used a mix of coffeescript and native JS. I'm equally uncomfortable in both! :)
* On the backend side, I use a separate Thread in an initializer to open up the web socket client for the app. There are a gazillion other ways to implement this, including a worker job, a RESTful api of either the push or pull sort, etc. The trick with threads is that they are very simple to implement for trivial tasks like this, but it's important to note that you can easily run into synch issues with your in-memory objects. So I don't recommend threads unless they are lightweight, fairly simple (this one, since it dispatches notifications, is a bit heavier than I would typically want a thread to be), and clearly separate in concern from other code. Stuff you can parallelize is a good example of cases where threads work really well in a Rails app (or elsewhere in Ruby code).
  * Another note about threads: MRI doesn't really "thread" in the same sense as JRuby - it does use native OS threads, but the Global Interpreter Lock prevents them from running simultaneously if they are part of the same core Ruby process. JRuby and as far as I'm aware other Ruby interpreters as well, don't have this problem (but they have others). This thread can still block or be blocked by the main thread if they need a lot of resources. Still, it does separate out the concerns and allows for a higher degree of concurrency and responsiveness than not using the thread would allow.
* You'll notice that I used a service to handle the incoming data once it has been identified as valid by the websocket subscriber.
  * This is a cleaner way to handle more domain-specific and complex logic than stuffing it into the subscriber thread (separation of concerns).
  * I tend to like services whenever I am:
    * Transforming data from one format into an internal object (although in trivial cases a method such as .create_from_foo on the model works too)
    * Executing workflows that encompass more than one object
    * Any complex business logic that is not the object's concern directly and is not clearly encapsulated anywhere else (this is quite like a "workflow" to me)
      * Validators fall into this category and I really like using Validator objects for validations that are business-logic defined and not a trivial case of data protection.
* I've used ActiveSupport::Notification for the dispatch of the action handling. I like this mechanism because it's a subscriber model for action-taking, but it has a few drawbacks:
  * The relationship between cause and effect is not directly discernable.
  * The number of effects a dispatch can have is not clear - a full code search will still not reveal, e.g., dynamic subscriptions.
  * It is a bit clumsy when trying to extend in real-time - new subscribers and dispatchers can be generated, but you cannot really communicate with a pre-existing subscriber to modify it's behaviour unless it's been coded to be pluggable in some manner.
* As a result, I tend to prefer, again, keeping the notification layer VERY lightweight, and only in one place: the initializer file where all subscriptions are registered.
  * Each subscription should then pass off it's responsibility to a service or handler which can contain the pluggable components, dynamic behaviour, etc. that that particular notification depends on - workflow models, dynamic decoration, or other behavioural programming can be used here, along with job queues and database-driven implementations/scripts using internal DSLs.
  * In addition, this dispatching could have been triggered by a wide range of other methods as well:
    * ActiveRecord callbacks
    * Direct calling from the service
    * A queued runner looking for changed data
    * A redis cache of the data feed and a separate parser process
    * etc. etc.
* I also didn't break out my GIT commits extremely carefully - these are larger, logical commits. I'm comfortable with both micro-committing atomically when developing, or the squash-rebase method for larger projects too. I left these un-squashed deliberately just to give you a sense of how I did it "off the cuff" while working quickly. These are the actual commits I made while working - I haven't gone back and edited them.

# Last but not least

Thanks so much for this fun project, and I look forward to discussing it further with you. Cheers!
