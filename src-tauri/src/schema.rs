// @generated automatically by Diesel CLI.

diesel::table! {
    notes (id) {
        id -> Integer,
        title -> Text,
        body -> Text,
        accent_color -> Text,
        words_count -> Integer,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}
