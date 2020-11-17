// this models file will also be imported into out lib
// we just made the schema file
// lets take advantage of it by bringing it into scope here

extern crate rocket;
extern crate rocket_contrib;
extern crate serde_derive;

use crate::schema::{bposts, busers};
use serde_derive::{Serialize};

#[derive(Debug, Queryable, Serialize)]
pub struct Buser {
    pub id: i32,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Insertable)]
#[table_name="busers"]
pub struct NewBuser {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub password: String,
}


#[derive(Debug, Queryable, Serialize)]
pub struct Bpost {
    pub id: i32,
    pub buser_id: i32,
    pub title: String,
    pub content: String,
    pub published: bool,
}

#[derive(Debug, Insertable)]
#[table_name="bposts"]
pub struct NewBpost {
    pub buser_id: i32,
    pub title: String,
    pub content: String,
}
