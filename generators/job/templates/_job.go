package jobs

import (
    "time"

    "github.com/gigablah/dashing-go"
)

type <%= _.camelize(name) %> struct{}

func (j *<%= _.camelize(name) %>) Work(send chan *dashing.Event) {
    ticker := time.NewTicker(1 * time.Second)
    for {
        select {
        case <- ticker.C:

            // do something

            send <- &dashing.Event{"<%= _.slugify(name) %>", map[string]interface{}{
                "foo": "bar",
            }, ""}
        }
    }
}

func init() {
    dashing.Register(&<%= _.camelize(name) %>{})
}
