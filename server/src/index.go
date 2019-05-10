package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
)

type Story struct {
	Id   int32  `json:"id"`
	Type string `json:"type"`
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func readJson(filename string) string {
	dat, err := ioutil.ReadFile(filename)
	check(err)
	// return string(dat)
	return json.Unmarshal(dat)
}

func getTopStories(w http.ResponseWriter, r *http.Request) {
	json := readJson("./items.json")
	fmt.Fprintf(w, json)
}

func getItem(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	for _, item := range items {

	}
}

func main() {
	items := json.readJson("./items.json")

	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/top-stories", getTopStories)
	myRouter.HandleFunc("/item/{id}", getItem)
	http.ListenAndServe(":3001", myRouter)
}
