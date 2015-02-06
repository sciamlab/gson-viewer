gson-viewer
============================

GeoJson Viewer

Intro
-----------------------
The aim of the project is to define a simple service to render on map the content of a URI returning dat in [GeoJson](http://geojson.org/) format

How to use
--------
The tool simply takes as input an URI as '''uri''' query parameter and shows it on the map:
[http://github.sciamlab.com/gson-viewer/?uri=rome.gson](http://github.sciamlab.com/gson-viewer?uri=rome.gson)

If a wrong uri is passed or the uri doesn't return a valid GeoJson, a world map is shown:
[http://github.sciamlab.com/gson-viewer/?uri=xxx.gson](http://github.sciamlab.com/gson-viewer?uri=xxx.gson)

Contribute
----------
The tool is pretty stable as it has been extensivelly tested. If you spot any issue please report on [ideas and bugs](https://github.com/sciamlab/gson-viewer/issues)



License
-------

    Copyright 2015 Sciamlab s.r.l.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
