// @generated automatically by Diesel CLI.

diesel::table! {
    folders (id) {
        id -> Integer,
        title -> Text,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    notes (id) {
        id -> Integer,
        title -> Text,
        body -> Text,
        accent_color -> Text,
        words_count -> Integer,
        favorited -> Bool,
        created_at -> Timestamp,
        updated_at -> Timestamp,
        folder -> Nullable<Integer>,
    }
}

diesel::joinable!(notes -> folders (folder));

diesel::allow_tables_to_appear_in_same_query!(
    folders,
    notes,
);
