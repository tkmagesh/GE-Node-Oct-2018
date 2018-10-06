it('calls subscribers on publish', function () {
  var callback = sinon.spy()
  PubSub.subscribe('message', callback)

  PubSub.publishSync('message')

  assertTrue(callback.called)
})


//Stubs
it('calls all subscribers, even if there are exceptions', function (){
  var message = 'an example message'
  var error = 'an example error message'
  var stub = sinon.stub().throws()
  var spy1 = sinon.spy()
  var spy2 = sinon.spy()

  PubSub.subscribe(message, stub)
  PubSub.subscribe(message, spy1)
  PubSub.subscribe(message, spy2)

  PubSub.publishSync(message, undefined)

  assert(spy1.called)
  assert(spy2.called)
  assert(stub.calledBefore(spy1))
})

//Mocks
it('calls all subscribers when exceptions happen', function () {
  var myAPI = { 
    method: function () {} 
  }

  var spy = sinon.spy()
  var mock = sinon.mock(myAPI)
  mock.expects("method").once().throws()

  PubSub.subscribe("message", myAPI.method)
  PubSub.subscribe("message", spy)
  PubSub.publishSync("message", undefined)

  mock.verify()
  assert(spy.calledOnce)
// example taken from the sinon documentation site: http://sinonjs.org/docs/
})