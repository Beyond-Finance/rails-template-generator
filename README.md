# Rails Template Generator

Rails Template Generator is itself a rails application which provides a simple form for selecting options for a new rails application.

The form outputs the target `rails new` command for the selections, along with a template reference back to the generator application. The template reference uses the form entry in order to run scripts and add files in accordance with our application patterns.

For the initial version, full applications may be specified; future versions will also allow for plugin creation.

The generator application may be run locally, although any new application will subsequently collide on port 3000 when run if the standard ports are used by both generator and generated applications. For local execution of the generator, consider running the generator application, selecting the form details, executing the `rails new` command, and stopping the generator application after the template execution has begun.
