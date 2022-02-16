package = "backend-lua"
version = "dev-1"
source = {
   url = "git+ssh://git@github.com/nmattela/docker-lecture-example-project.git"
}
description = {
   homepage = "*** please enter a project homepage ***",
   license = "*** please specify a license ***"
}
build = {
   type = "builtin",
   modules = {
      main = "main.lua"
   }
}
