// @generated automatically by Diesel CLI.

diesel::table! {
    notes (id) {
        id -> Integer,
        title -> Text,
        body -> Text,
        done -> Bool,
    }
}
