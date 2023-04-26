// @generated automatically by Diesel CLI.

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
    }
}
