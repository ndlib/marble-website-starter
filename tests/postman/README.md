# Postman Test Suite
First, install newman: `npm install -g newman`

Then, to run test suite:
```
newman run collection.json --env-var hostname=your.site.here
```
