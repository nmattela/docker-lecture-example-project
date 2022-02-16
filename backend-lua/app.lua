local lapis = require "lapis"
local app = lapis.Application()
local pgmoon = require "pgmoon"
local pg = pgmoon.new({
    host = "localhost",
    port = "5432",
    database = "list",
    user = "list",
    password = "list"
})

assert(pg:connect())

function getAll()
    return pg:query("SELECT * FROM list_items")
end

app:match("/", function(self)
    return getAll()
end)

return app