// @generated automatically by Diesel CLI.

diesel::table! {
    notes (id) {
        id -> Integer,
        title -> Text,
        body -> Text,
        excerpt -> Nullable<Text>,
        accent_color -> Nullable<Text>,
        words_count -> Nullable<Integer>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}
