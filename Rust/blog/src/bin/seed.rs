extern crate bcrypt;
extern crate lib;
extern crate diesel;

use bcrypt::{hash, DEFAULT_COST};
use diesel::prelude::*;
use lib::models::*;
use lib::*;
use fake::Fake;

fn main() {
    use schema::bposts::dsl::*;
    use schema::busers::dsl::*;

    use fake::faker::internet::en::*;
    use fake::faker::lorem::en::*;
    use fake::faker::name::en::*;

    let connection = establish_connection();

    let plain_text_pw = "testing";
    let hashed_password = match hash(plain_text_pw, DEFAULT_COST) {
        Ok(hashed) => hashed,
        Err(_) => panic!("Error hashing"),
    };

    diesel::delete(bposts)
        .execute(&connection)
        .expect("Error deleting posts");

    diesel::delete(busers)
        .execute(&connection)
        .expect("Error deleting users");

    fn generate_user_info(pw: &str) -> NewBuser {
        NewBuser {
            first_name: Name().fake(),
            last_name: Name().fake(),
            email: FreeEmail().fake(),
            password: pw.to_string(),
        }
    }

    fn generate_post_info(uid: i32) -> NewBpost {
        NewBpost {
            buser_id: uid,
            title: Sentence(1..4).fake(),
            content: Paragraph(1..4).fake(),
        }
    }

    let me = NewBuser {
        first_name: "Walter".to_string(),
        last_name: "A".to_string(),
        email: "notwalter@gmail.com".to_string(),
        password: hashed_password.to_string(),
    };

    diesel::insert_into(busers)
        .values(&me)
        .execute(&connection)
        .expect("Error inserting users");

    // Create 10 randomly generated users stored in a vec
    let new_user_list: Vec<NewBuser> = (0..10)
        .map(|_| generate_user_info(&hashed_password))
        .collect();

    // INSERT that vec of users and get a vec back of the newely inserted users.
    // They will have ids that we can assign to the posts.
    let returned_users = diesel::insert_into(busers)
        .values(&new_user_list)
        .get_results::<Buser>(&connection)
        .expect("Error inserting users");

    // For each of the new users, create some posts
    let new_post_list: Vec<NewBpost> = returned_users
        .into_iter()
        .map(|buser| generate_post_info(buser.id))
        .collect();

    // Insert those posts
    diesel::insert_into(bposts)
        .values(&new_post_list)
        .execute(&connection)
        .expect("Error inserting posts");
}
