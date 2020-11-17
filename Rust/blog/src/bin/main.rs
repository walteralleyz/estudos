// Inside `src/bin/main.rs`

#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
extern crate diesel;
extern crate lib;
extern crate rocket_contrib;
extern crate tera;

// bring both template and context into scope
use rocket_contrib::templates::tera::Context;
use rocket_contrib::templates::Template;

use diesel::prelude::*;
use lib::models::*;
use lib::*;

fn main() {
    rocket::ignite()
        .mount("/", routes![index])
        // this let us use templating
        .attach(Template::fairing())
        .launch();
}

#[get("/")]
fn index() -> Template {
    use schema::bposts::dsl::*;
    use schema::busers::dsl::*;

    let connection = establish_connection();
    let mut context = Context::new();

    let post_list = bposts.load::<Bpost>(&connection).expect("Error loading posts");
    let user_list = busers.load::<Buser>(&connection).expect("Error loading users");

    context.insert("posts", &post_list);
    context.insert("users", &user_list);

    Template::render("layout", &context)
}
