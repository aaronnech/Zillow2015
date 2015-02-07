Data Pipelines
--------------

Each data pipeline will be pipeline from the data source (e.g. a file, or website) to a table in our database. Each pipeline supports:

1. `initalize()` Allocate and initalize any resources needed by the pipeline.
2. `getName()` Returns a string name for this pipeline.
3. `run(callback)` run the pipeline, returning an array of JSON objects indicating each element to the callback.

Our harvester will utilize `DataPipeline` to collect and fill our database. The process is the following (for now):

1. Empty our housing database
2. Initialize an array of `DataPipeline`
3. Run each `DataPipeline` in a seperate thread (if possible)
4. For each `DataPipeline` that terminates, get it's translation map, and `INSERT` the data into our database.

Later, our harvester will run stand alone and cross-compare data elements with our database, avoiding duplicates.

Ideally, we will also have another entity running that will kick out out-dated data from our database.