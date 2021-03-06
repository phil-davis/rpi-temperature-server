var frisby = require('frisby');

// Test that the temperature at timestamp endpoint exists
// and returns reasonable data.

// The temperature at timestamp tests use a dummy timestamp that happens to be
// a time somewhere in 2016. The API endpoint specifies that it will return the
// temperature data closest to the given timestamp, so in all cases something
// should be returned even if the tests are run against data generated
// weeks, months, years in the past or future.

frisby.create('Temperature at timestamp test')
  .get('http://localhost:8888/api/temperature/1451610700')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    success: true,
    data: {
      unit: "C",
      temperature: 24.1,
      timestamp: 1451610700
    }
  })
  .expectJSONTypes({
    data: {
      unit: String,
      temperature: Number,
      timestamp: Number
    }
  })
.toss();

frisby.create('Temperature at timestamp C test')
  .get('http://localhost:8888/api/temperature/1451610700?unit=C')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    success: true,
    data: {
      unit: "C",
      temperature: 24.1,
      timestamp: 1451610700
    }
  })
  .expectJSONTypes({
    data: {
      unit: String,
      temperature: Number,
      timestamp: Number
    }
  })
.toss();

frisby.create('Temperature at timestamp F test')
  .get('http://localhost:8888/api/temperature/1451610700?unit=F')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    success: true,
    data: {
      unit: "F",
      temperature: 75.38,
      timestamp: 1451610700
    }
  })
  .expectJSONTypes({
    data: {
      unit: String,
      temperature: Number,
      timestamp: Number
    }
  })
.toss();

frisby.create('Temperature at timestamp K test')
  .get('http://localhost:8888/api/temperature/1451610700?unit=K')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    success: true,
    data: {
      unit: "K",
      temperature: 297.25,
      timestamp: 1451610700
    }
  })
  .expectJSONTypes({
    data: {
      unit: String,
      temperature: Number,
      timestamp: Number
    }
  })
.toss();

frisby.create('Temperature at timestamp R test')
  .get('http://localhost:8888/api/temperature/1451610700?unit=R')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    success: true,
    data: {
      unit: "R",
      temperature: 535.05,
      timestamp: 1451610700
    }
  })
  .expectJSONTypes({
    data: {
      unit: String,
      temperature: Number,
      timestamp: Number
    }
  })
.toss();

frisby.create('Temperature at timestamp invalid unit test')
  .get('http://localhost:8888/api/temperature/1451610700?unit=X')
  .expectStatus(400)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    reason: "invalid unit parameter",
    success: false
  })
.toss();

// 20 9's is a number bigger than the max unsigned 64-bit value.
// This should be read OK by the Python and reduced down to
// the current time by validation in the app.
frisby.create('Temperature at future timestamp test')
  .get('http://localhost:8888/api/temperature/99999999999999999999')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    success: true,
    data: {
      unit: "C",
      temperature: 8.4,
      timestamp: 1451614900
    }
  })
  .expectJSONTypes({
    data: {
      unit: String,
      temperature: Number,
      timestamp: Number
    }
  })
.toss();

frisby.create('Temperature at early timestamp test')
  .get('http://localhost:8888/api/temperature/1000000000')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    success: true,
    data: {
      unit: "C",
      temperature: 10,
      timestamp: 1451610000
    }
  })
  .expectJSONTypes({
    data: {
      unit: String,
      temperature: Number,
      timestamp: Number
    }
  })
.toss();

frisby.create('Temperature at zero timestamp test')
  .get('http://localhost:8888/api/temperature/0')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    success: true,
    data: {
      unit: "C",
      temperature: 10,
      timestamp: 1451610000
    }
  })
  .expectJSONTypes({
    data: {
      unit: String,
      temperature: Number,
      timestamp: Number
    }
  })
.toss();

frisby.create('Temperature at zero-string timestamp test')
  .get('http://localhost:8888/api/temperature/00000000')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    success: true,
    data: {
      unit: "C",
      temperature: 10,
      timestamp: 1451610000
    }
  })
  .expectJSONTypes({
    data: {
      unit: String,
      temperature: Number,
      timestamp: Number
    }
  })
.toss();

frisby.create('Temperature at midpoint1 timestamp test')
  .get('http://localhost:8888/api/temperature/1451611640')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    success: true,
    data: {
      unit: "C",
      temperature: 35.5,
      timestamp: 1451611600
    }
  })
  .expectJSONTypes({
    data: {
      unit: String,
      temperature: Number,
      timestamp: Number
    }
  })
.toss();

frisby.create('Temperature at midpoint2 timestamp test')
  .get('http://localhost:8888/api/temperature/1451611665')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    success: true,
    data: {
      unit: "C",
      temperature: 32.2,
      timestamp: 1451611700
    }
  })
  .expectJSONTypes({
    data: {
      unit: String,
      temperature: Number,
      timestamp: Number
    }
  })
.toss();
