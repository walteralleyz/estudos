table! {
    bposts (id) {
        id -> Int4,
        buser_id -> Int4,
        title -> Varchar,
        content -> Text,
        published -> Bool,
    }
}

table! {
    busers (id) {
        id -> Int4,
        first_name -> Varchar,
        last_name -> Varchar,
        email -> Varchar,
        password -> Varchar,
    }
}

table! {
    cat (id) {
        id -> Int4,
        category -> Varchar,
    }
}

table! {
    categories (id) {
        id -> Int4,
        categoria -> Varchar,
    }
}

table! {
    clients (id) {
        id -> Int4,
        name -> Varchar,
        position -> Varchar,
        email -> Varchar,
        phone -> Varchar,
        password -> Varchar,
        createdat -> Int8,
        updatedat -> Int8,
    }
}

table! {
    consumer (id) {
        id -> Int4,
        nick -> Varchar,
        email -> Varchar,
        phone -> Varchar,
        points -> Nullable<Int4>,
        questionDoneId -> Nullable<Varchar>,
        avatar -> Varchar,
    }
}

table! {
    item_list (id) {
        id -> Int4,
        store -> Varchar,
        items -> Json,
        createdAt -> Int8,
        updatedAt -> Int8,
        userId -> Nullable<Int4>,
    }
}

table! {
    migrations (id) {
        id -> Int4,
        timestamp -> Int8,
        name -> Varchar,
    }
}

table! {
    products (id) {
        id -> Int4,
        label -> Varchar,
        category -> Varchar,
        qnt -> Int4,
        price -> Float8,
        createdat -> Int8,
        updatedat -> Int8,
    }
}

table! {
    question (id) {
        id -> Int4,
        pergunta -> Varchar,
        escolhas -> Json,
        resposta -> Varchar,
        categoria -> Varchar,
    }
}

table! {
    sales (id) {
        id -> Int4,
        qnt -> Int4,
        createdat -> Int8,
        updatedat -> Int8,
        clientsId -> Nullable<Int4>,
        productsId -> Nullable<Int4>,
    }
}

table! {
    super_user (id) {
        id -> Int4,
        name -> Varchar,
        email -> Varchar,
        image -> Bytea,
        code -> Int4,
        createdAt -> Int8,
        updatedAt -> Int8,
    }
}

table! {
    user (id) {
        id -> Int4,
        name -> Varchar,
        description -> Varchar,
        email -> Varchar,
        image -> Bytea,
        createdAt -> Int4,
        updatedAt -> Int4,
    }
}

joinable!(item_list -> super_user (userId));
joinable!(sales -> clients (clientsId));
joinable!(sales -> products (productsId));

allow_tables_to_appear_in_same_query!(
    bposts,
    busers,
    cat,
    categories,
    clients,
    consumer,
    item_list,
    migrations,
    products,
    question,
    sales,
    super_user,
    user,
);
