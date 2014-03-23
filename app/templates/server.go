package main

import (
    "github.com/gigablah/dashing-go"
    _ "./jobs"
)

func main() {
    dashing.Start()
}
