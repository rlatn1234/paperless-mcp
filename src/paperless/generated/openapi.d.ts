/**
 * GENERATED FILE — do not edit.
 *
 * Produced by `npm run gen:openapi` from a paperless-ngx instance's
 * /api/schema/ endpoint. See scripts/gen-openapi.ts.
 * Schema version: 6.0.0 (10)
 */
export interface paths {
    "/api/bulk_edit_objects/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Perform a bulk edit operation on a list of objects */
        post: operations["bulk_edit_objects"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/config/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the application configuration */
        get: operations["config_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/config/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["config_retrieve"];
        put: operations["config_update"];
        post?: never;
        delete: operations["config_destroy"];
        options?: never;
        head?: never;
        patch: operations["config_partial_update"];
        trace?: never;
    };
    "/api/correspondents/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        get: operations["correspondents_list"];
        put?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        post: operations["correspondents_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/correspondents/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        get: operations["correspondents_retrieve"];
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        put: operations["correspondents_update"];
        post?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        delete: operations["correspondents_destroy"];
        options?: never;
        head?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        patch: operations["correspondents_partial_update"];
        trace?: never;
    };
    "/api/custom_fields/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        get: operations["custom_fields_list"];
        put?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        post: operations["custom_fields_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/custom_fields/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        get: operations["custom_fields_retrieve"];
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        put: operations["custom_fields_update"];
        post?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        delete: operations["custom_fields_destroy"];
        options?: never;
        head?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        patch: operations["custom_fields_partial_update"];
        trace?: never;
    };
    "/api/document_types/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        get: operations["document_types_list"];
        put?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        post: operations["document_types_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/document_types/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        get: operations["document_types_retrieve"];
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        put: operations["document_types_update"];
        post?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        delete: operations["document_types_destroy"];
        options?: never;
        head?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        patch: operations["document_types_partial_update"];
        trace?: never;
    };
    "/api/documents/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Document views including search */
        get: operations["documents_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Retrieve a single document */
        get: operations["documents_retrieve"];
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        put: operations["documents_update"];
        post?: never;
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        delete: operations["documents_destroy"];
        options?: never;
        head?: never;
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        patch: operations["documents_partial_update"];
        trace?: never;
    };
    "/api/documents/{id}/ai_suggestions/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description View AI suggestions for the document */
        get: operations["documents_ai_suggestions_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/download/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Download the document */
        get: operations["documents_download_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/email/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * @deprecated
         * @description Email the document to one or more recipients as an attachment.
         */
        post: operations["documents_email_document"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/history/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description View the document history */
        get: operations["documents_history_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/metadata/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description View the document metadata */
        get: operations["documents_metadata_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/notes/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description View, add, or delete notes for the document */
        get: operations["documents_notes_list"];
        put?: never;
        /** @description View, add, or delete notes for the document */
        post: operations["documents_notes_create"];
        /** @description View, add, or delete notes for the document */
        delete: operations["documents_notes_destroy"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/preview/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description View the document preview */
        get: operations["documents_preview_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/root/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        get: operations["documents_root"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/share_links/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description View share links for the document */
        get: operations["document_share_links"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/suggestions/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description View suggestions for the document */
        get: operations["documents_suggestions_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/thumb/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description View the document thumbnail */
        get: operations["documents_thumb_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/update_version/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        post: operations["documents_update_version"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/{id}/versions/{version_id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        delete: operations["documents_delete_version"];
        options?: never;
        head?: never;
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        patch: operations["documents_update_version_label"];
        trace?: never;
    };
    "/api/documents/bulk_download/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Download multiple documents as a ZIP archive. */
        post: operations["bulk_download"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/bulk_edit/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Perform a bulk edit operation on a list of documents */
        post: operations["bulk_edit"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/chat/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["documents_chat_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/delete/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Move selected documents to trash */
        post: operations["documents_delete"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/edit_pdf/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Perform PDF edit operations on a selected document */
        post: operations["documents_edit_pdf"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/email/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Email one or more documents as attachments to one or more recipients. */
        post: operations["email_documents"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/merge_as_versions/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Merge selected documents as versions of a chosen root document */
        post: operations["documents_merge_as_versions"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/merge/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Merge selected documents into a new document */
        post: operations["documents_merge"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/next_asn/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the next available Archive Serial Number (ASN) for a new document */
        get: operations["documents_next_asn_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/post_document/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Upload a document via the API */
        post: operations["documents_post_document_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/remove_password/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Remove password protection from selected PDFs */
        post: operations["documents_remove_password"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/reprocess/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Reprocess selected documents */
        post: operations["documents_reprocess"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/rotate/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Rotate one or more documents */
        post: operations["documents_rotate"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/documents/selection_data/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Get selection data for the selected documents */
        post: operations["documents_selection_data_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/groups/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["groups_list"];
        put?: never;
        post: operations["groups_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/groups/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["groups_retrieve"];
        put: operations["groups_update"];
        post?: never;
        delete: operations["groups_destroy"];
        options?: never;
        head?: never;
        patch: operations["groups_partial_update"];
        trace?: never;
    };
    "/api/logs/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Logs view */
        get: operations["logs_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/logs/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Single log view */
        get: operations["retrieve_log"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/mail_accounts/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Pass a user object to serializer */
        get: operations["mail_accounts_list"];
        put?: never;
        /** @description Pass a user object to serializer */
        post: operations["mail_accounts_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/mail_accounts/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Pass a user object to serializer */
        get: operations["mail_accounts_retrieve"];
        /** @description Pass a user object to serializer */
        put: operations["mail_accounts_update"];
        post?: never;
        /** @description Pass a user object to serializer */
        delete: operations["mail_accounts_destroy"];
        options?: never;
        head?: never;
        /** @description Pass a user object to serializer */
        patch: operations["mail_accounts_partial_update"];
        trace?: never;
    };
    "/api/mail_accounts/{id}/process/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Manually process the selected mail account for new messages. */
        post: operations["mail_account_process"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/mail_accounts/test/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Test a mail account */
        post: operations["mail_account_test"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/mail_rules/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Pass a user object to serializer */
        get: operations["mail_rules_list"];
        put?: never;
        /** @description Pass a user object to serializer */
        post: operations["mail_rules_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/mail_rules/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Pass a user object to serializer */
        get: operations["mail_rules_retrieve"];
        /** @description Pass a user object to serializer */
        put: operations["mail_rules_update"];
        post?: never;
        /** @description Pass a user object to serializer */
        delete: operations["mail_rules_destroy"];
        options?: never;
        head?: never;
        /** @description Pass a user object to serializer */
        patch: operations["mail_rules_partial_update"];
        trace?: never;
    };
    "/api/oauth/callback/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Callback view for OAuth2 authentication */
        get: operations["oauth_callback_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/processed_mail/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Pass a user object to serializer */
        get: operations["processed_mail_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/processed_mail/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Pass a user object to serializer */
        get: operations["processed_mail_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/processed_mail/bulk_delete/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Delete multiple processed mail records by ID. */
        post: operations["processed_mail_bulk_delete"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/profile/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description User profile view, only available when logged in */
        get: operations["profile_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** @description User profile view, only available when logged in */
        patch: operations["profile_partial_update"];
        trace?: never;
    };
    "/api/profile/disconnect_social_account/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Disconnects a social account provider from the user account */
        post: operations["profile_disconnect_social_account_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/profile/generate_auth_token/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * @description Generates (or re-generates) an auth token, requires a logged in user
         *     unlike the default DRF endpoint
         */
        post: operations["profile_generate_auth_token_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/profile/social_account_providers/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description List of social account providers */
        get: operations["profile_social_account_providers_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/profile/totp/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Generates a new TOTP secret and returns the URL and SVG */
        get: operations["profile_totp_retrieve"];
        put?: never;
        /** @description Validates a TOTP code and activates the TOTP authenticator */
        post: operations["profile_totp_create"];
        /** @description Deactivates the TOTP authenticator */
        delete: operations["profile_totp_destroy"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/remote_version/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the current version of the Paperless-NGX server */
        get: operations["remote_version_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/saved_views/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        get: operations["saved_views_list"];
        put?: never;
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        post: operations["saved_views_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/saved_views/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        get: operations["saved_views_retrieve"];
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        put: operations["saved_views_update"];
        post?: never;
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        delete: operations["saved_views_destroy"];
        options?: never;
        head?: never;
        /** @description Prefetch Django-Guardian permissions for a list before serialization, to avoid N+1 queries. */
        patch: operations["saved_views_partial_update"];
        trace?: never;
    };
    "/api/search/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Global search */
        get: operations["search_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/search/autocomplete/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get a list of all available tags */
        get: operations["search_autocomplete_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/share_link_bundles/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Pass a user object to serializer */
        get: operations["share_link_bundles_list"];
        put?: never;
        /** @description Pass a user object to serializer */
        post: operations["share_link_bundles_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/share_link_bundles/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Pass a user object to serializer */
        get: operations["share_link_bundles_retrieve"];
        /** @description Pass a user object to serializer */
        put: operations["share_link_bundles_update"];
        post?: never;
        /** @description Pass a user object to serializer */
        delete: operations["share_link_bundles_destroy"];
        options?: never;
        head?: never;
        /** @description Pass a user object to serializer */
        patch: operations["share_link_bundles_partial_update"];
        trace?: never;
    };
    "/api/share_link_bundles/{id}/rebuild/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Reset and re-queue a share link bundle for processing. */
        post: operations["share_link_bundles_rebuild"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/share_links/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Pass a user object to serializer */
        get: operations["share_links_list"];
        put?: never;
        /** @description Pass a user object to serializer */
        post: operations["share_links_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/share_links/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Pass a user object to serializer */
        get: operations["share_links_retrieve"];
        put?: never;
        post?: never;
        /** @description Pass a user object to serializer */
        delete: operations["share_links_destroy"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/statistics/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get statistics for the current user */
        get: operations["statistics_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/status/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get the current system status of the Paperless-NGX server */
        get: operations["status_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/storage_paths/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        get: operations["storage_paths_list"];
        put?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        post: operations["storage_paths_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/storage_paths/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        get: operations["storage_paths_retrieve"];
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        put: operations["storage_paths_update"];
        post?: never;
        /**
         * @description When a storage path is deleted, see if documents
         *     using it require a rename/move
         */
        delete: operations["storage_paths_destroy"];
        options?: never;
        head?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        patch: operations["storage_paths_partial_update"];
        trace?: never;
    };
    "/api/storage_paths/test/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Test a storage path template against a document. */
        post: operations["storage_paths_test"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tags/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Build a children map once to avoid per-parent queries in the serializer. */
        get: operations["tags_list"];
        put?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        post: operations["tags_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tags/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        get: operations["tags_retrieve"];
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        put: operations["tags_update"];
        post?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        delete: operations["tags_destroy"];
        options?: never;
        head?: never;
        /** @description Mixin to add document count to queryset, permissions-aware if needed */
        patch: operations["tags_partial_update"];
        trace?: never;
    };
    "/api/tasks/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["tasks_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tasks/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["tasks_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tasks/acknowledge/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Acknowledge a list of tasks, or all visible unacknowledged tasks */
        post: operations["acknowledge_tasks"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tasks/active/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Currently pending and running tasks (capped at 50). */
        get: operations["tasks_active_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tasks/run/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Manually dispatch a background task. Superuser only. */
        post: operations["run_task"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tasks/status_counts/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Aggregated task counts for task UI sections. */
        get: operations["tasks_status_counts_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/tasks/summary/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Aggregated task statistics per task_type over the last N days (default 30). */
        get: operations["tasks_summary_list"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/token/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["token_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/trash/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["trash_list"];
        put?: never;
        post: operations["trash_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/ui_settings/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["ui_settings_retrieve"];
        put?: never;
        post: operations["ui_settings_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/users/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["users_list"];
        put?: never;
        post: operations["users_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/users/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["users_retrieve"];
        put: operations["users_update"];
        post?: never;
        delete: operations["users_destroy"];
        options?: never;
        head?: never;
        patch: operations["users_partial_update"];
        trace?: never;
    };
    "/api/users/{id}/deactivate_totp/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["users_deactivate_totp_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/workflow_actions/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["workflow_actions_list"];
        put?: never;
        post: operations["workflow_actions_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/workflow_actions/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["workflow_actions_retrieve"];
        put: operations["workflow_actions_update"];
        post?: never;
        delete: operations["workflow_actions_destroy"];
        options?: never;
        head?: never;
        patch: operations["workflow_actions_partial_update"];
        trace?: never;
    };
    "/api/workflow_triggers/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["workflow_triggers_list"];
        put?: never;
        post: operations["workflow_triggers_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/workflow_triggers/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["workflow_triggers_retrieve"];
        put: operations["workflow_triggers_update"];
        post?: never;
        delete: operations["workflow_triggers_destroy"];
        options?: never;
        head?: never;
        patch: operations["workflow_triggers_partial_update"];
        trace?: never;
    };
    "/api/workflows/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["workflows_list"];
        put?: never;
        post: operations["workflows_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/workflows/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["workflows_retrieve"];
        put: operations["workflows_update"];
        post?: never;
        delete: operations["workflows_destroy"];
        options?: never;
        head?: never;
        patch: operations["workflows_partial_update"];
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /**
         * @description * `1` - IMAP
         *     * `2` - Gmail OAuth
         *     * `3` - Outlook OAuth
         * @enum {integer}
         */
        AccountTypeEnum: 1 | 2 | 3;
        AcknowledgeTasks: {
            result: number;
        };
        AcknowledgeTasksViewRequest: {
            /** @default false */
            all: boolean;
            tasks?: number[];
        };
        Actor: {
            id: number;
            username: string;
        };
        AISuggestions: {
            correspondents: number[];
            dates: string[];
            document_types: number[];
            storage_paths: number[];
            suggested_correspondents: string[];
            suggested_document_types: string[];
            suggested_storage_paths: string[];
            suggested_tags: string[];
            tags: number[];
            title: string | null;
        };
        ApplicationConfiguration: {
            /** Enables AI features */
            ai_enabled?: boolean | null;
            /**
             * Application logo
             * Format: uri
             */
            app_logo?: string | null;
            /** Application title */
            app_title?: string | null;
            /** Controls archive file generation */
            archive_file_generation?: (components["schemas"]["ArchiveFileGenerationEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets the ASN barcode prefix */
            barcode_asn_prefix?: string | null;
            /** Sets the barcode DPI */
            barcode_dpi?: number | null;
            /** Enables ASN barcode */
            barcode_enable_asn?: boolean | null;
            /** Enables tag barcode */
            barcode_enable_tag?: boolean | null;
            /** Enables barcode TIFF support */
            barcode_enable_tiff_support?: boolean | null;
            /** Sets the maximum pages for barcode */
            barcode_max_pages?: number | null;
            /** Retains split pages */
            barcode_retain_split_pages?: boolean | null;
            /** Sets the barcode string */
            barcode_string?: string | null;
            barcode_tag_mapping: unknown;
            /** Enables splitting on tag barcodes */
            barcode_tag_split?: boolean | null;
            /**
             * Sets the barcode upscale factor
             * Format: double
             */
            barcode_upscale?: number | null;
            /** Enables barcode scanning */
            barcodes_enabled?: boolean | null;
            /** Sets the Ghostscript color conversion strategy */
            color_conversion_strategy?: (components["schemas"]["ColorConversionStrategyEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Enables deskew */
            deskew?: boolean | null;
            readonly id: number;
            /** Sets image DPI fallback value */
            image_dpi?: number | null;
            /** Do OCR using these languages */
            language?: string | null;
            llm_api_key?: string | null;
            /** Sets the LLM backend */
            llm_backend?: (components["schemas"]["LlmBackendEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets the LLM context size */
            llm_context_size?: number | null;
            /** Sets the LLM embedding backend */
            llm_embedding_backend?: (components["schemas"]["LlmEmbeddingBackendEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets the LLM embedding chunk size */
            llm_embedding_chunk_size?: number | null;
            /** Sets the LLM embedding endpoint, optional */
            llm_embedding_endpoint?: string | null;
            /** Sets the LLM embedding model */
            llm_embedding_model?: string | null;
            /** Sets the LLM endpoint, optional */
            llm_endpoint?: string | null;
            /** Sets the LLM model */
            llm_model?: string | null;
            /** Sets the LLM output language */
            llm_output_language?: string | null;
            /** Sets the LLM timeout in seconds */
            llm_request_timeout?: number | null;
            /**
             * Sets the maximum image size for decompression
             * Format: double
             */
            max_image_pixels?: number | null;
            /** Sets the OCR mode */
            mode?: (components["schemas"]["ModeEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets the output PDF type */
            output_type?: (components["schemas"]["OutputTypeEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Do OCR from page 1 to this value */
            pages?: number | null;
            remote_ocr_api_key?: string | null;
            /** Sets the remote OCR endpoint */
            remote_ocr_endpoint?: string | null;
            /** Sets the remote OCR engine */
            remote_ocr_engine?: (components["schemas"]["RemoteOcrEngineEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets which documents are sent to the remote OCR engine */
            remote_ocr_mode?: (components["schemas"]["RemoteOcrModeEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Enables page rotation */
            rotate_pages?: boolean | null;
            /**
             * Sets the threshold for rotation of pages
             * Format: double
             */
            rotate_pages_threshold?: number | null;
            /** Controls the unpaper cleaning */
            unpaper_clean?: (components["schemas"]["UnpaperCleanEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            user_args: unknown;
        };
        ApplicationConfigurationRequest: {
            /** Enables AI features */
            ai_enabled?: boolean | null;
            /**
             * Application logo
             * Format: binary
             */
            app_logo?: string | null;
            /** Application title */
            app_title?: string | null;
            /** Controls archive file generation */
            archive_file_generation?: (components["schemas"]["ArchiveFileGenerationEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets the ASN barcode prefix */
            barcode_asn_prefix?: string | null;
            /** Sets the barcode DPI */
            barcode_dpi?: number | null;
            /** Enables ASN barcode */
            barcode_enable_asn?: boolean | null;
            /** Enables tag barcode */
            barcode_enable_tag?: boolean | null;
            /** Enables barcode TIFF support */
            barcode_enable_tiff_support?: boolean | null;
            /** Sets the maximum pages for barcode */
            barcode_max_pages?: number | null;
            /** Retains split pages */
            barcode_retain_split_pages?: boolean | null;
            /** Sets the barcode string */
            barcode_string?: string | null;
            barcode_tag_mapping: unknown;
            /** Enables splitting on tag barcodes */
            barcode_tag_split?: boolean | null;
            /**
             * Sets the barcode upscale factor
             * Format: double
             */
            barcode_upscale?: number | null;
            /** Enables barcode scanning */
            barcodes_enabled?: boolean | null;
            /** Sets the Ghostscript color conversion strategy */
            color_conversion_strategy?: (components["schemas"]["ColorConversionStrategyEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Enables deskew */
            deskew?: boolean | null;
            /** Sets image DPI fallback value */
            image_dpi?: number | null;
            /** Do OCR using these languages */
            language?: string | null;
            llm_api_key?: string | null;
            /** Sets the LLM backend */
            llm_backend?: (components["schemas"]["LlmBackendEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets the LLM context size */
            llm_context_size?: number | null;
            /** Sets the LLM embedding backend */
            llm_embedding_backend?: (components["schemas"]["LlmEmbeddingBackendEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets the LLM embedding chunk size */
            llm_embedding_chunk_size?: number | null;
            /** Sets the LLM embedding endpoint, optional */
            llm_embedding_endpoint?: string | null;
            /** Sets the LLM embedding model */
            llm_embedding_model?: string | null;
            /** Sets the LLM endpoint, optional */
            llm_endpoint?: string | null;
            /** Sets the LLM model */
            llm_model?: string | null;
            /** Sets the LLM output language */
            llm_output_language?: string | null;
            /** Sets the LLM timeout in seconds */
            llm_request_timeout?: number | null;
            /**
             * Sets the maximum image size for decompression
             * Format: double
             */
            max_image_pixels?: number | null;
            /** Sets the OCR mode */
            mode?: (components["schemas"]["ModeEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets the output PDF type */
            output_type?: (components["schemas"]["OutputTypeEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Do OCR from page 1 to this value */
            pages?: number | null;
            remote_ocr_api_key?: string | null;
            /** Sets the remote OCR endpoint */
            remote_ocr_endpoint?: string | null;
            /** Sets the remote OCR engine */
            remote_ocr_engine?: (components["schemas"]["RemoteOcrEngineEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets which documents are sent to the remote OCR engine */
            remote_ocr_mode?: (components["schemas"]["RemoteOcrModeEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Enables page rotation */
            rotate_pages?: boolean | null;
            /**
             * Sets the threshold for rotation of pages
             * Format: double
             */
            rotate_pages_threshold?: number | null;
            /** Controls the unpaper cleaning */
            unpaper_clean?: (components["schemas"]["UnpaperCleanEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            user_args: unknown;
        };
        /**
         * @description * `auto` - auto
         *     * `always` - always
         *     * `never` - never
         * @enum {string}
         */
        ArchiveFileGenerationEnum: "auto" | "always" | "never";
        ArchiveMetadataEntry: {
            key: string;
            namespace: string;
            prefix: string;
            value: string;
        };
        /**
         * @description * `1` - Do not assign a correspondent
         *     * `2` - Use mail address
         *     * `3` - Use name (or mail address if not available)
         *     * `4` - Use correspondent selected below
         * @enum {integer}
         */
        AssignCorrespondentFromEnum: 1 | 2 | 3 | 4;
        /**
         * @description * `1` - Use subject as title
         *     * `2` - Use attachment filename as title
         *     * `3` - Do not assign title from rule
         * @enum {integer}
         */
        AssignTitleFromEnum: 1 | 2 | 3;
        /**
         * @description * `1` - Only process attachments.
         *     * `2` - Process all files, including 'inline' attachments.
         * @enum {integer}
         */
        AttachmentTypeEnum: 1 | 2;
        BasicUser: {
            first_name?: string;
            readonly id: number;
            last_name?: string;
            /** @description Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
            username: string;
        };
        BasicUserRequest: {
            first_name?: string;
            last_name?: string;
            /** @description Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
            username: string;
        };
        /** @enum {unknown} */
        BlankEnum: "";
        BulkDeleteMailRequestRequest: {
            mail_ids: number[];
        };
        BulkDeleteMailResponse: {
            deleted_mail_ids: number[];
            result: string;
        };
        BulkDownloadRequest: {
            /** @default false */
            all: boolean;
            /** @default none */
            compression: components["schemas"]["CompressionEnum"];
            /** @default archive */
            content: components["schemas"]["ContentEnum"];
            documents?: number[];
            filters?: {
                [key: string]: unknown;
            };
            /** @default false */
            follow_formatting: boolean;
        };
        BulkEditDocumentsResult: {
            result: string;
        };
        BulkEditObjectsRequest: {
            /** @default false */
            all: boolean;
            filters?: {
                [key: string]: unknown;
            };
            /** @default false */
            merge: boolean;
            object_type: components["schemas"]["ObjectTypeEnum"];
            objects?: number[];
            operation: components["schemas"]["OperationEnum"];
            owner?: number | null;
            /** Set permissions */
            permissions?: {
                [key: string]: unknown;
            };
        };
        BulkEditRequest: {
            /** @default false */
            all: boolean;
            documents?: number[];
            filters?: {
                [key: string]: unknown;
            };
            /** @default false */
            from_webui: boolean;
            method: components["schemas"]["MethodEnum"];
            /** @default {} */
            parameters: {
                [key: string]: unknown;
            };
        };
        BulkEditResult: {
            result: string;
        };
        ChatStreaming: {
            document_id?: number | null;
            q: string;
        };
        ChatStreamingRequest: {
            document_id?: number | null;
            q: string;
        };
        Classifier: {
            error: string;
            /** Format: date-time */
            last_trained: string;
            status: string;
        };
        /**
         * @description * `LeaveColorUnchanged` - LeaveColorUnchanged
         *     * `RGB` - RGB
         *     * `UseDeviceIndependentColor` - UseDeviceIndependentColor
         *     * `Gray` - Gray
         *     * `CMYK` - CMYK
         * @enum {string}
         */
        ColorConversionStrategyEnum: "LeaveColorUnchanged" | "RGB" | "UseDeviceIndependentColor" | "Gray" | "CMYK";
        /**
         * @description * `none` - none
         *     * `deflated` - deflated
         *     * `bzip2` - bzip2
         *     * `lzma` - lzma
         * @enum {string}
         */
        CompressionEnum: "none" | "deflated" | "bzip2" | "lzma";
        /**
         * @description * `1` - Only process attachments.
         *     * `2` - Process full Mail (with embedded attachments in file) as .eml
         *     * `3` - Process full Mail (with embedded attachments in file) as .eml + process attachments as separate documents
         * @enum {integer}
         */
        ConsumptionScopeEnum: 1 | 2 | 3;
        /**
         * @description * `archive` - archive
         *     * `originals` - originals
         *     * `both` - both
         * @enum {string}
         */
        ContentEnum: "archive" | "originals" | "both";
        Correspondent: {
            readonly document_count: number;
            readonly id: number;
            is_insensitive?: boolean;
            /** Format: date */
            readonly last_correspondence: string;
            match?: string;
            matching_algorithm?: components["schemas"]["MatchingAlgorithm"];
            name: string;
            owner?: number | null;
            readonly permissions: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
            readonly slug: string;
            readonly user_can_change: boolean;
        };
        CorrespondentCounts: {
            document_count: number;
            id: number;
        };
        CorrespondentRequest: {
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["MatchingAlgorithm"];
            name: string;
            owner?: number | null;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
        };
        CustomField: {
            data_type: components["schemas"]["DataTypeEnum"];
            readonly document_count: number;
            /** @description Extra data for the custom field, such as select options */
            extra_data?: unknown;
            readonly id: number;
            name: string;
        };
        CustomFieldCounts: {
            document_count: number;
            id: number;
        };
        CustomFieldInstance: {
            field: number;
            /**
             * @description Given the *incoming* primitive data, return the value for this field
             *     that should be validated and transformed to a native value.
             */
            value: (string | number | {
                [key: string]: unknown;
            }) | null;
        };
        CustomFieldInstanceRequest: {
            field: number;
            /**
             * @description Given the *incoming* primitive data, return the value for this field
             *     that should be validated and transformed to a native value.
             */
            value: (string | number | {
                [key: string]: unknown;
            }) | null;
        };
        CustomFieldRequest: {
            data_type: components["schemas"]["DataTypeEnum"];
            /** @description Extra data for the custom field, such as select options */
            extra_data?: unknown;
            name: string;
        };
        Database: {
            error: string;
            migration_status: components["schemas"]["MigrationStatus"];
            status: string;
            type: string;
            url: string;
        };
        /**
         * @description * `string` - string
         *     * `url` - url
         *     * `date` - date
         *     * `boolean` - boolean
         *     * `integer` - integer
         *     * `float` - float
         *     * `monetary` - monetary
         *     * `documentlink` - documentlink
         *     * `select` - select
         *     * `longtext` - longtext
         * @enum {string}
         */
        DataTypeEnum: "string" | "url" | "date" | "boolean" | "integer" | "float" | "monetary" | "documentlink" | "select" | "longtext";
        DeleteDocumentsRequest: {
            /** @default false */
            all: boolean;
            documents?: number[];
            filters?: {
                [key: string]: unknown;
            };
        };
        DeleteDocumentsResult: {
            result: string;
        };
        /**
         * @description * `table` - Table
         *     * `smallCards` - Small Cards
         *     * `largeCards` - Large Cards
         * @enum {string}
         */
        DisplayModeEnum: "table" | "smallCards" | "largeCards";
        /** @description Adds update nested feature */
        Document: {
            /** Format: date-time */
            readonly added: string;
            /**
             * Format: int64
             * @description The position of this document in your physical document archive.
             */
            archive_serial_number?: number | null;
            readonly archived_file_name: string | null;
            /** @description The raw, text-only data of the document. This field is primarily used for searching. */
            content?: string;
            correspondent: number | null;
            /** Format: date */
            created?: string;
            /**
             * Format: date
             * @deprecated
             */
            created_date?: string;
            custom_fields?: components["schemas"]["CustomFieldInstance"][];
            /** Format: date-time */
            deleted_at?: string | null;
            document_type: number | null;
            readonly duplicate_documents: components["schemas"]["DuplicateDocumentSummary"][];
            readonly id: number;
            readonly is_shared_by_requester: boolean;
            readonly mime_type: string;
            /** Format: date-time */
            readonly modified: string;
            readonly notes: components["schemas"]["Notes"][];
            readonly original_file_name: string | null;
            owner?: number | null;
            readonly page_count: number | null;
            readonly permissions: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
            readonly root_document: number;
            storage_path: number | null;
            tags: number[];
            title?: string;
            readonly user_can_change: boolean;
            readonly versions: components["schemas"]["DocumentVersionInfo"][];
        };
        DocumentListRequest: {
            documents: number[];
        };
        /** @description Adds update nested feature */
        DocumentRequest: {
            /**
             * Format: int64
             * @description The position of this document in your physical document archive.
             */
            archive_serial_number?: number | null;
            /** @description The raw, text-only data of the document. This field is primarily used for searching. */
            content?: string;
            correspondent: number | null;
            /** Format: date */
            created?: string;
            /**
             * Format: date
             * @deprecated
             */
            created_date?: string;
            custom_fields?: components["schemas"]["CustomFieldInstanceRequest"][];
            /** Format: date-time */
            deleted_at?: string | null;
            document_type: number | null;
            owner?: number | null;
            /** @default false */
            remove_inbox_tags: boolean | null;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
            storage_path: number | null;
            tags: number[];
            title?: string;
        };
        DocumentRootResponse: {
            root_id: number;
        };
        DocumentType: {
            readonly document_count: number;
            readonly id: number;
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["MatchingAlgorithm"];
            name: string;
            owner?: number | null;
            readonly permissions: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
            readonly slug: string;
            readonly user_can_change: boolean;
        };
        DocumentTypeCounts: {
            document_count: number;
            id: number;
        };
        DocumentTypeRequest: {
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["MatchingAlgorithm"];
            name: string;
            owner?: number | null;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
        };
        DocumentVersionInfo: {
            /** Format: date-time */
            added: string;
            checksum?: string | null;
            id: number;
            is_root: boolean;
            version_label?: string | null;
        };
        DocumentVersionRequest: {
            /** Format: binary */
            document: string;
            version_label?: string | null;
        };
        DuplicateDocumentSummary: {
            /** Format: date-time */
            deleted_at: string | null;
            id: number;
            title: string;
        };
        EditPdfDocumentsRequest: {
            /** @default false */
            delete_original: boolean;
            documents: number[];
            /** @default false */
            from_webui: boolean;
            /** @default true */
            include_metadata: boolean;
            operations: unknown[];
            /** @default latest_version */
            source_mode: string;
            /** @default false */
            update_document: boolean;
        };
        EditPdfDocumentsResult: {
            result: string;
        };
        EmailDocumentRequestRequest: {
            /**
             * Email addresses
             * @description Comma-separated email addresses
             */
            addresses: string;
            /** Email message */
            message: string;
            /** Email subject */
            subject: string;
            /**
             * @description Use archive version of documents if available
             * @default true
             */
            use_archive_version: boolean;
        };
        EmailDocumentResponse: {
            message: string;
        };
        EmailDocumentsResponse: {
            message: string;
        };
        EmailRequest: {
            /**
             * Email addresses
             * @description Comma-separated email addresses
             */
            addresses: string;
            documents: number[];
            /** Email message */
            message: string;
            /** Email subject */
            subject: string;
            /**
             * @description Use archive version of documents if available
             * @default true
             */
            use_archive_version: boolean;
        };
        /**
         * @description * `archive` - Archive
         *     * `original` - Original
         * @enum {string}
         */
        FileVersionEnum: "archive" | "original";
        Group: {
            readonly id: number;
            name: string;
            permissions: string[];
        };
        GroupRequest: {
            name: string;
            permissions: string[];
        };
        /**
         * @description * `archive` - Archive
         *     * `bank` - Bank
         *     * `basket` - Basket
         *     * `bell` - Bell
         *     * `bookmark` - Bookmark
         *     * `boxes` - Boxes
         *     * `briefcase` - Briefcase
         *     * `building` - Building
         *     * `calculator` - Calculator
         *     * `calendar` - Calendar
         *     * `camera` - Camera
         *     * `card-checklist` - Checklist
         *     * `cash` - Cash
         *     * `chat-left-text` - Chat
         *     * `check-circle` - Check
         *     * `clipboard` - Clipboard
         *     * `clock-history` - Clock
         *     * `credit-card` - Credit card
         *     * `download` - Download
         *     * `envelope` - Envelope
         *     * `exclamation-triangle` - Warning
         *     * `file-earmark` - File
         *     * `file-earmark-check` - Checked file
         *     * `file-earmark-lock` - Locked file
         *     * `file-earmark-medical` - Medical file
         *     * `file-earmark-person` - Person file
         *     * `file-earmark-spreadsheet` - Spreadsheet
         *     * `file-text` - Text file
         *     * `files` - Files
         *     * `folder` - Folder
         *     * `funnel` - Filter
         *     * `gear` - Gear
         *     * `globe2` - Globe
         *     * `hash` - Hash
         *     * `heart` - Heart
         *     * `house` - House
         *     * `inbox` - Inbox
         *     * `journals` - Journals
         *     * `list-task` - Task list
         *     * `newspaper` - Newspaper
         *     * `paperclip` - Attachment
         *     * `people` - People
         *     * `person` - Person
         *     * `printer` - Printer
         *     * `receipt` - Receipt
         *     * `safe` - Safe
         *     * `search` - Search
         *     * `send` - Send
         *     * `shop` - Shop
         *     * `stack` - Stack
         *     * `stars` - Stars
         *     * `tag` - Tag
         *     * `tags` - Tags
         *     * `telephone` - Telephone
         *     * `truck` - Truck
         *     * `upc-scan` - Barcode
         *     * `wallet2` - Wallet
         * @enum {string}
         */
        IconEnum: "archive" | "bank" | "basket" | "bell" | "bookmark" | "boxes" | "briefcase" | "building" | "calculator" | "calendar" | "camera" | "card-checklist" | "cash" | "chat-left-text" | "check-circle" | "clipboard" | "clock-history" | "credit-card" | "download" | "envelope" | "exclamation-triangle" | "file-earmark" | "file-earmark-check" | "file-earmark-lock" | "file-earmark-medical" | "file-earmark-person" | "file-earmark-spreadsheet" | "file-text" | "files" | "folder" | "funnel" | "gear" | "globe2" | "hash" | "heart" | "house" | "inbox" | "journals" | "list-task" | "newspaper" | "paperclip" | "people" | "person" | "printer" | "receipt" | "safe" | "search" | "send" | "shop" | "stack" | "stars" | "tag" | "tags" | "telephone" | "truck" | "upc-scan" | "wallet2";
        /**
         * @description * `1` - No encryption
         *     * `2` - Use SSL
         *     * `3` - Use STARTTLS
         * @enum {integer}
         */
        ImapSecurityEnum: 1 | 2 | 3;
        Index: {
            error: string;
            /** Format: date-time */
            last_modified: string;
            status: string;
        };
        /**
         * @description * `openai-like` - OpenAI-compatible
         *     * `ollama` - Ollama
         * @enum {string}
         */
        LlmBackendEnum: "openai-like" | "ollama";
        /**
         * @description * `openai-like` - OpenAI-compatible
         *     * `huggingface` - Huggingface
         *     * `ollama` - Ollama
         * @enum {string}
         */
        LlmEmbeddingBackendEnum: "openai-like" | "huggingface" | "ollama";
        LogEntry: {
            action: string;
            actor: components["schemas"]["Actor"];
            changes: {
                [key: string]: unknown;
            };
            id: number;
            /** Format: date-time */
            timestamp: string;
        };
        MailAccount: {
            account_type?: components["schemas"]["AccountTypeEnum"];
            /** @description The character set to use when communicating with the mail server, such as 'UTF-8' or 'US-ASCII'. */
            character_set?: string;
            /**
             * Format: date-time
             * @description The expiration date of the refresh token.
             */
            expiration?: string | null;
            readonly id: number;
            /** @description This is usually 143 for unencrypted and STARTTLS connections, and 993 for SSL connections. */
            imap_port?: number | null;
            imap_security?: components["schemas"]["ImapSecurityEnum"];
            imap_server: string;
            /** Is token authentication */
            is_token?: boolean;
            name: string;
            owner?: number | null;
            password: string;
            readonly user_can_change: boolean;
            username: string;
        };
        MailAccountProcessResponse: {
            /** @default OK */
            result: string;
        };
        MailAccountRequest: {
            account_type?: components["schemas"]["AccountTypeEnum"];
            /** @description The character set to use when communicating with the mail server, such as 'UTF-8' or 'US-ASCII'. */
            character_set?: string;
            /**
             * Format: date-time
             * @description The expiration date of the refresh token.
             */
            expiration?: string | null;
            /** @description This is usually 143 for unencrypted and STARTTLS connections, and 993 for SSL connections. */
            imap_port?: number | null;
            imap_security?: components["schemas"]["ImapSecurityEnum"];
            imap_server: string;
            /** Is token authentication */
            is_token?: boolean;
            name: string;
            owner?: number | null;
            password: string;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
            username: string;
        };
        MailAccountTestResponse: {
            success: boolean;
        };
        MailRule: {
            account: number;
            action?: components["schemas"]["MailRuleActionEnum"];
            /** @default  */
            action_parameter: string | null;
            assign_correspondent?: number | null;
            assign_correspondent_from?: components["schemas"]["AssignCorrespondentFromEnum"];
            assign_document_type?: number | null;
            /** Assign the rule owner to documents */
            assign_owner_from_rule?: boolean;
            assign_tags?: (number | null)[];
            assign_title_from?: components["schemas"]["AssignTitleFromEnum"];
            /**
             * @description Inline attachments include embedded images, so it's best to combine this option with a filename filter.
             *
             *     * `1` - Only process attachments.
             *     * `2` - Process all files, including 'inline' attachments.
             */
            attachment_type?: components["schemas"]["AttachmentTypeEnum"];
            consumption_scope?: components["schemas"]["ConsumptionScopeEnum"];
            enabled?: boolean;
            /**
             * Filter attachment filename exclusive
             * @description Do not consume documents which entirely match this filename if specified. Wildcards such as *.pdf or *invoice* are allowed. Case insensitive.
             */
            filter_attachment_filename_exclude?: string | null;
            /**
             * Filter attachment filename inclusive
             * @description Only consume documents which entirely match this filename if specified. Wildcards such as *.pdf or *invoice* are allowed. Case insensitive.
             */
            filter_attachment_filename_include?: string | null;
            filter_body?: string | null;
            filter_from?: string | null;
            filter_subject?: string | null;
            filter_to?: string | null;
            /** @description Subfolders must be separated by a delimiter, often a dot ('.') or slash ('/'), but it varies by mail server. */
            folder?: string;
            readonly id: number;
            /** @description Specified in days. */
            maximum_age?: number;
            name: string;
            order?: number;
            owner?: number | null;
            pdf_layout?: components["schemas"]["PdfLayoutEnum"];
            /**
             * Stop processing further rules
             * @description If True, no further rules will be processed after this one if any document is queued.
             */
            stop_processing?: boolean;
            readonly user_can_change: boolean;
        };
        /**
         * @description * `1` - Delete
         *     * `2` - Move to specified folder
         *     * `3` - Mark as read, don't process read mails
         *     * `4` - Flag the mail, don't process flagged mails
         *     * `5` - Tag the mail with specified tag, don't process tagged mails
         * @enum {integer}
         */
        MailRuleActionEnum: 1 | 2 | 3 | 4 | 5;
        MailRuleRequest: {
            account: number;
            action?: components["schemas"]["MailRuleActionEnum"];
            /** @default  */
            action_parameter: string | null;
            assign_correspondent?: number | null;
            assign_correspondent_from?: components["schemas"]["AssignCorrespondentFromEnum"];
            assign_document_type?: number | null;
            /** Assign the rule owner to documents */
            assign_owner_from_rule?: boolean;
            assign_tags?: (number | null)[];
            assign_title_from?: components["schemas"]["AssignTitleFromEnum"];
            /**
             * @description Inline attachments include embedded images, so it's best to combine this option with a filename filter.
             *
             *     * `1` - Only process attachments.
             *     * `2` - Process all files, including 'inline' attachments.
             */
            attachment_type?: components["schemas"]["AttachmentTypeEnum"];
            consumption_scope?: components["schemas"]["ConsumptionScopeEnum"];
            enabled?: boolean;
            /**
             * Filter attachment filename exclusive
             * @description Do not consume documents which entirely match this filename if specified. Wildcards such as *.pdf or *invoice* are allowed. Case insensitive.
             */
            filter_attachment_filename_exclude?: string | null;
            /**
             * Filter attachment filename inclusive
             * @description Only consume documents which entirely match this filename if specified. Wildcards such as *.pdf or *invoice* are allowed. Case insensitive.
             */
            filter_attachment_filename_include?: string | null;
            filter_body?: string | null;
            filter_from?: string | null;
            filter_subject?: string | null;
            filter_to?: string | null;
            /** @description Subfolders must be separated by a delimiter, often a dot ('.') or slash ('/'), but it varies by mail server. */
            folder?: string;
            /** @description Specified in days. */
            maximum_age?: number;
            name: string;
            order?: number;
            owner?: number | null;
            pdf_layout?: components["schemas"]["PdfLayoutEnum"];
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
            /**
             * Stop processing further rules
             * @description If True, no further rules will be processed after this one if any document is queued.
             */
            stop_processing?: boolean;
        };
        /**
         * @description * `0` - None
         *     * `1` - Any word
         *     * `2` - All words
         *     * `3` - Exact match
         *     * `4` - Regular expression
         *     * `5` - Fuzzy word
         *     * `6` - Automatic
         * @enum {integer}
         */
        MatchingAlgorithm: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        MergeDocumentsAsVersionsRequest: {
            documents: number[];
            root_document_id: number;
            version_label?: string | null;
        };
        MergeDocumentsAsVersionsResult: {
            result: string;
        };
        MergeDocumentsRequest: {
            /** @default false */
            archive_fallback: boolean;
            /** @default false */
            delete_originals: boolean;
            documents: number[];
            /** @default false */
            from_webui: boolean;
            metadata_document_id?: number | null;
            /** @default latest_version */
            source_mode: string;
        };
        MergeDocumentsResult: {
            result: string;
        };
        Metadata: {
            archive_checksum?: string | null;
            archive_media_filename?: string | null;
            archive_metadata?: components["schemas"]["ArchiveMetadataEntry"][] | null;
            archive_size?: number | null;
            has_archive_version: boolean;
            lang: string;
            media_filename: string;
            original_checksum: string;
            original_filename: string;
            original_metadata: components["schemas"]["OriginalMetadataEntry"][];
            original_mime_type: string;
            original_size: number;
        };
        /**
         * @description * `set_correspondent` - set_correspondent
         *     * `set_document_type` - set_document_type
         *     * `set_storage_path` - set_storage_path
         *     * `add_tag` - add_tag
         *     * `remove_tag` - remove_tag
         *     * `modify_tags` - modify_tags
         *     * `modify_custom_fields` - modify_custom_fields
         *     * `set_permissions` - set_permissions
         *     * `delete` - delete
         *     * `reprocess` - reprocess
         *     * `rotate` - rotate
         *     * `merge` - merge
         *     * `edit_pdf` - edit_pdf
         *     * `remove_password` - remove_password
         *     * `split` - split
         *     * `delete_pages` - delete_pages
         * @enum {string}
         */
        MethodEnum: "set_correspondent" | "set_document_type" | "set_storage_path" | "add_tag" | "remove_tag" | "modify_tags" | "modify_custom_fields" | "set_permissions" | "delete" | "reprocess" | "rotate" | "merge" | "edit_pdf" | "remove_password" | "split" | "delete_pages";
        MigrationStatus: {
            latest_migration: string;
            unapplied_migrations: string[];
        };
        /**
         * @description * `auto` - auto
         *     * `force` - force
         *     * `redo` - redo
         *     * `off` - off
         * @enum {string}
         */
        ModeEnum: "auto" | "force" | "redo" | "off";
        NoteCreateRequestRequest: {
            note: string;
        };
        Notes: {
            /** Format: date-time */
            created?: string;
            readonly id: number;
            /**
             * Content
             * @description Note for the document
             */
            note?: string;
            readonly user: components["schemas"]["BasicUser"];
        };
        NotesRequest: {
            /** Format: date-time */
            created?: string;
            /**
             * Content
             * @description Note for the document
             */
            note?: string;
        };
        /** @enum {unknown} */
        NullEnum: null;
        /**
         * @description * `tags` - tags
         *     * `correspondents` - correspondents
         *     * `document_types` - document_types
         *     * `storage_paths` - storage_paths
         * @enum {string}
         */
        ObjectTypeEnum: "tags" | "correspondents" | "document_types" | "storage_paths";
        /**
         * @description * `set_permissions` - set_permissions
         *     * `delete` - delete
         * @enum {string}
         */
        OperationEnum: "set_permissions" | "delete";
        OriginalMetadataEntry: {
            key: string;
            namespace: string;
            prefix: string;
            value: string;
        };
        /**
         * @description * `pdf` - pdf
         *     * `pdfa` - pdfa
         *     * `pdfa-1` - pdfa-1
         *     * `pdfa-2` - pdfa-2
         *     * `pdfa-3` - pdfa-3
         * @enum {string}
         */
        OutputTypeEnum: "pdf" | "pdfa" | "pdfa-1" | "pdfa-2" | "pdfa-3";
        PaginatedCorrespondentList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["Correspondent"][];
        };
        PaginatedCustomFieldList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["CustomField"][];
        };
        PaginatedDocumentList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["Document"][];
        };
        PaginatedDocumentTypeList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["DocumentType"][];
        };
        PaginatedGroupList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["Group"][];
        };
        PaginatedLogEntryList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["LogEntry"][];
        };
        PaginatedMailAccountList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["MailAccount"][];
        };
        PaginatedMailRuleList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["MailRule"][];
        };
        PaginatedProcessedMailList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["ProcessedMail"][];
        };
        PaginatedSavedViewList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["SavedView"][];
        };
        PaginatedShareLinkBundleList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["ShareLinkBundle"][];
        };
        PaginatedShareLinkList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["ShareLink"][];
        };
        PaginatedStoragePathList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["StoragePath"][];
        };
        PaginatedTagList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["Tag"][];
        };
        PaginatedTaskSerializerV10List: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["TaskSerializerV10"][];
        };
        PaginatedUserList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["User"][];
        };
        PaginatedWorkflowActionList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["WorkflowAction"][];
        };
        PaginatedWorkflowList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["Workflow"][];
        };
        PaginatedWorkflowTriggerList: {
            /** @example 123 */
            count: number;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=4
             */
            next?: string | null;
            /**
             * Format: uri
             * @example http://api.example.org/accounts/?page=2
             */
            previous?: string | null;
            results: components["schemas"]["WorkflowTrigger"][];
        };
        PaperlessAuthToken: {
            readonly token: string;
        };
        PaperlessAuthTokenRequest: {
            /** MFA Code */
            code?: string;
            password: string;
            username: string;
        };
        PatchedApplicationConfigurationRequest: {
            /** Enables AI features */
            ai_enabled?: boolean | null;
            /**
             * Application logo
             * Format: binary
             */
            app_logo?: string | null;
            /** Application title */
            app_title?: string | null;
            /** Controls archive file generation */
            archive_file_generation?: (components["schemas"]["ArchiveFileGenerationEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets the ASN barcode prefix */
            barcode_asn_prefix?: string | null;
            /** Sets the barcode DPI */
            barcode_dpi?: number | null;
            /** Enables ASN barcode */
            barcode_enable_asn?: boolean | null;
            /** Enables tag barcode */
            barcode_enable_tag?: boolean | null;
            /** Enables barcode TIFF support */
            barcode_enable_tiff_support?: boolean | null;
            /** Sets the maximum pages for barcode */
            barcode_max_pages?: number | null;
            /** Retains split pages */
            barcode_retain_split_pages?: boolean | null;
            /** Sets the barcode string */
            barcode_string?: string | null;
            barcode_tag_mapping?: unknown;
            /** Enables splitting on tag barcodes */
            barcode_tag_split?: boolean | null;
            /**
             * Sets the barcode upscale factor
             * Format: double
             */
            barcode_upscale?: number | null;
            /** Enables barcode scanning */
            barcodes_enabled?: boolean | null;
            /** Sets the Ghostscript color conversion strategy */
            color_conversion_strategy?: (components["schemas"]["ColorConversionStrategyEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Enables deskew */
            deskew?: boolean | null;
            /** Sets image DPI fallback value */
            image_dpi?: number | null;
            /** Do OCR using these languages */
            language?: string | null;
            llm_api_key?: string | null;
            /** Sets the LLM backend */
            llm_backend?: (components["schemas"]["LlmBackendEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets the LLM context size */
            llm_context_size?: number | null;
            /** Sets the LLM embedding backend */
            llm_embedding_backend?: (components["schemas"]["LlmEmbeddingBackendEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets the LLM embedding chunk size */
            llm_embedding_chunk_size?: number | null;
            /** Sets the LLM embedding endpoint, optional */
            llm_embedding_endpoint?: string | null;
            /** Sets the LLM embedding model */
            llm_embedding_model?: string | null;
            /** Sets the LLM endpoint, optional */
            llm_endpoint?: string | null;
            /** Sets the LLM model */
            llm_model?: string | null;
            /** Sets the LLM output language */
            llm_output_language?: string | null;
            /** Sets the LLM timeout in seconds */
            llm_request_timeout?: number | null;
            /**
             * Sets the maximum image size for decompression
             * Format: double
             */
            max_image_pixels?: number | null;
            /** Sets the OCR mode */
            mode?: (components["schemas"]["ModeEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets the output PDF type */
            output_type?: (components["schemas"]["OutputTypeEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Do OCR from page 1 to this value */
            pages?: number | null;
            remote_ocr_api_key?: string | null;
            /** Sets the remote OCR endpoint */
            remote_ocr_endpoint?: string | null;
            /** Sets the remote OCR engine */
            remote_ocr_engine?: (components["schemas"]["RemoteOcrEngineEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Sets which documents are sent to the remote OCR engine */
            remote_ocr_mode?: (components["schemas"]["RemoteOcrModeEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            /** Enables page rotation */
            rotate_pages?: boolean | null;
            /**
             * Sets the threshold for rotation of pages
             * Format: double
             */
            rotate_pages_threshold?: number | null;
            /** Controls the unpaper cleaning */
            unpaper_clean?: (components["schemas"]["UnpaperCleanEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            user_args?: unknown;
        };
        PatchedCorrespondentRequest: {
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["MatchingAlgorithm"];
            name?: string;
            owner?: number | null;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
        };
        PatchedCustomFieldRequest: {
            data_type?: components["schemas"]["DataTypeEnum"];
            /** @description Extra data for the custom field, such as select options */
            extra_data?: unknown;
            name?: string;
        };
        /** @description Adds update nested feature */
        PatchedDocumentRequest: {
            /**
             * Format: int64
             * @description The position of this document in your physical document archive.
             */
            archive_serial_number?: number | null;
            /** @description The raw, text-only data of the document. This field is primarily used for searching. */
            content?: string;
            correspondent?: number | null;
            /** Format: date */
            created?: string;
            /**
             * Format: date
             * @deprecated
             */
            created_date?: string;
            custom_fields?: components["schemas"]["CustomFieldInstanceRequest"][];
            /** Format: date-time */
            deleted_at?: string | null;
            document_type?: number | null;
            owner?: number | null;
            /** @default false */
            remove_inbox_tags: boolean | null;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
            storage_path?: number | null;
            tags?: number[];
            title?: string;
        };
        PatchedDocumentTypeRequest: {
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["MatchingAlgorithm"];
            name?: string;
            owner?: number | null;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
        };
        PatchedDocumentVersionLabelRequest: {
            version_label?: string | null;
        };
        PatchedGroupRequest: {
            name?: string;
            permissions?: string[];
        };
        PatchedMailAccountRequest: {
            account_type?: components["schemas"]["AccountTypeEnum"];
            /** @description The character set to use when communicating with the mail server, such as 'UTF-8' or 'US-ASCII'. */
            character_set?: string;
            /**
             * Format: date-time
             * @description The expiration date of the refresh token.
             */
            expiration?: string | null;
            /** @description This is usually 143 for unencrypted and STARTTLS connections, and 993 for SSL connections. */
            imap_port?: number | null;
            imap_security?: components["schemas"]["ImapSecurityEnum"];
            imap_server?: string;
            /** Is token authentication */
            is_token?: boolean;
            name?: string;
            owner?: number | null;
            password?: string;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
            username?: string;
        };
        PatchedMailRuleRequest: {
            account?: number;
            action?: components["schemas"]["MailRuleActionEnum"];
            /** @default  */
            action_parameter: string | null;
            assign_correspondent?: number | null;
            assign_correspondent_from?: components["schemas"]["AssignCorrespondentFromEnum"];
            assign_document_type?: number | null;
            /** Assign the rule owner to documents */
            assign_owner_from_rule?: boolean;
            assign_tags?: (number | null)[];
            assign_title_from?: components["schemas"]["AssignTitleFromEnum"];
            /**
             * @description Inline attachments include embedded images, so it's best to combine this option with a filename filter.
             *
             *     * `1` - Only process attachments.
             *     * `2` - Process all files, including 'inline' attachments.
             */
            attachment_type?: components["schemas"]["AttachmentTypeEnum"];
            consumption_scope?: components["schemas"]["ConsumptionScopeEnum"];
            enabled?: boolean;
            /**
             * Filter attachment filename exclusive
             * @description Do not consume documents which entirely match this filename if specified. Wildcards such as *.pdf or *invoice* are allowed. Case insensitive.
             */
            filter_attachment_filename_exclude?: string | null;
            /**
             * Filter attachment filename inclusive
             * @description Only consume documents which entirely match this filename if specified. Wildcards such as *.pdf or *invoice* are allowed. Case insensitive.
             */
            filter_attachment_filename_include?: string | null;
            filter_body?: string | null;
            filter_from?: string | null;
            filter_subject?: string | null;
            filter_to?: string | null;
            /** @description Subfolders must be separated by a delimiter, often a dot ('.') or slash ('/'), but it varies by mail server. */
            folder?: string;
            /** @description Specified in days. */
            maximum_age?: number;
            name?: string;
            order?: number;
            owner?: number | null;
            pdf_layout?: components["schemas"]["PdfLayoutEnum"];
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
            /**
             * Stop processing further rules
             * @description If True, no further rules will be processed after this one if any document is queued.
             */
            stop_processing?: boolean;
        };
        PatchedProfileRequest: {
            email?: string;
            first_name?: string;
            last_name?: string;
            password?: string;
        };
        PatchedSavedViewRequest: {
            /** Document display fields */
            display_fields?: unknown;
            /** View display mode */
            display_mode?: (components["schemas"]["DisplayModeEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            filter_rules?: components["schemas"]["SavedViewFilterRuleRequest"][];
            icon?: components["schemas"]["IconEnum"];
            name?: string;
            owner?: number | null;
            /** View page size */
            page_size?: number | null;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
            sort_field?: string | null;
            sort_reverse?: boolean;
        };
        PatchedShareLinkBundleRequest: {
            document_ids?: number[];
            expiration_days?: number | null;
            file_version?: components["schemas"]["FileVersionEnum"];
        };
        PatchedStoragePathRequest: {
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["MatchingAlgorithm"];
            name?: string;
            owner?: number | null;
            path?: string;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
        };
        PatchedTagRequest: {
            color?: string;
            /** @description Marks this tag as an inbox tag: All newly consumed documents will be tagged with inbox tags. */
            is_inbox_tag?: boolean;
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["MatchingAlgorithm"];
            name?: string;
            owner?: number | null;
            parent?: number | null;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
        };
        PatchedUserRequest: {
            /** Format: date-time */
            date_joined?: string;
            /** Email address */
            email?: string;
            first_name?: string;
            /** @description The groups this user belongs to. A user will get all permissions granted to each of their groups. */
            groups?: number[];
            /**
             * Active
             * @description Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
             */
            is_active?: boolean;
            /**
             * Staff status
             * @description Designates whether the user can log into this admin site.
             */
            is_staff?: boolean;
            /**
             * Superuser status
             * @description Designates that this user has all permissions without explicitly assigning them.
             */
            is_superuser?: boolean;
            last_name?: string;
            password?: string;
            user_permissions?: string[];
            /** @description Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
            username?: string;
        };
        PatchedWorkflowActionRequest: {
            /**
             * Create missing objects
             * @description Create suggested tags, correspondents, document types and storage paths that do not already exist instead of skipping them.
             */
            ai_create_missing?: boolean;
            /**
             * Overwrite existing values
             * @description Apply suggestions even if the document already has a value for that field. Tags are always added to, never replaced.
             */
            ai_overwrite_existing?: boolean;
            /** @description Which of the AI-suggested fields to apply to the document. */
            ai_suggestion_fields?: unknown;
            /** Grant change permissions to these groups */
            assign_change_groups?: number[];
            /** Grant change permissions to these users */
            assign_change_users?: number[];
            assign_correspondent?: number | null;
            /** Assign these custom fields */
            assign_custom_fields?: number[];
            /**
             * Custom field values
             * @description Optional values to assign to the custom fields.
             */
            assign_custom_fields_values?: unknown;
            assign_document_type?: number | null;
            /** Assign this owner */
            assign_owner?: number | null;
            assign_storage_path?: number | null;
            assign_tags?: (number | null)[];
            /** @description Assign a document title, must  be a Jinja2 template, see documentation. */
            assign_title?: string | null;
            /** Grant view permissions to these groups */
            assign_view_groups?: number[];
            /** Grant view permissions to these users */
            assign_view_users?: number[];
            email?: components["schemas"]["WorkflowActionEmailRequest"] | null;
            id?: number | null;
            /** @description Passwords to try when removing PDF protection. Separate with commas or new lines. */
            passwords?: unknown;
            remove_all_correspondents?: boolean;
            remove_all_custom_fields?: boolean;
            remove_all_document_types?: boolean;
            remove_all_owners?: boolean;
            remove_all_permissions?: boolean;
            remove_all_storage_paths?: boolean;
            remove_all_tags?: boolean;
            /** Remove change permissions for these groups */
            remove_change_groups?: number[];
            /** Remove change permissions for these users */
            remove_change_users?: number[];
            /** Remove these correspondent(s) */
            remove_correspondents?: number[];
            /** Remove these custom fields */
            remove_custom_fields?: number[];
            /** Remove these document type(s) */
            remove_document_types?: number[];
            /** Remove these owner(s) */
            remove_owners?: number[];
            /** Remove these storage path(s) */
            remove_storage_paths?: number[];
            /** Remove these tag(s) */
            remove_tags?: number[];
            /** Remove view permissions for these groups */
            remove_view_groups?: number[];
            /** Remove view permissions for these users */
            remove_view_users?: number[];
            /** Workflow Action Type */
            type?: components["schemas"]["WorkflowActionTypeEnum"];
            webhook?: components["schemas"]["WorkflowActionWebhookRequest"] | null;
        };
        PatchedWorkflowRequest: {
            actions?: components["schemas"]["WorkflowActionRequest"][];
            enabled?: boolean;
            name?: string;
            order?: number;
            triggers?: components["schemas"]["WorkflowTriggerRequest"][];
        };
        PatchedWorkflowTriggerRequest: {
            /** @description JSON-encoded custom field query expression. */
            filter_custom_field_query?: string | null;
            /** @description Only consume documents which entirely match this filename if specified. Wildcards such as *.pdf or *invoice* are allowed. Case insensitive. */
            filter_filename?: string | null;
            /** Has all of these tag(s) */
            filter_has_all_tags?: number[];
            /** Has one of these correspondents */
            filter_has_any_correspondents?: number[];
            /** Has one of these document types */
            filter_has_any_document_types?: number[];
            /** Has one of these storage paths */
            filter_has_any_storage_paths?: number[];
            /** Has this correspondent */
            filter_has_correspondent?: number | null;
            /** Has this document type */
            filter_has_document_type?: number | null;
            /** Does not have these correspondent(s) */
            filter_has_not_correspondents?: number[];
            /** Does not have these document type(s) */
            filter_has_not_document_types?: number[];
            /** Does not have these storage path(s) */
            filter_has_not_storage_paths?: number[];
            /** Does not have these tag(s) */
            filter_has_not_tags?: number[];
            /** Has this storage path */
            filter_has_storage_path?: number | null;
            /** Has these tag(s) */
            filter_has_tags?: number[];
            /** Filter documents from this mail rule */
            filter_mailrule?: number | null;
            /** @description Only consume documents with a path that matches this if specified. Wildcards specified as * are allowed. Case insensitive. */
            filter_path?: string | null;
            id?: number | null;
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["WorkflowTriggerMatchingAlgorithmEnum"];
            schedule_date_custom_field?: number | null;
            /**
             * @description The field to check for a schedule trigger.
             *
             *     * `added` - Added
             *     * `created` - Created
             *     * `modified` - Modified
             *     * `custom_field` - Custom Field
             */
            schedule_date_field?: components["schemas"]["ScheduleDateFieldEnum"];
            /** @description If the schedule should be recurring. */
            schedule_is_recurring?: boolean;
            /** @description The number of days to offset the schedule trigger by. */
            schedule_offset_days?: number;
            /**
             * Schedule recurring delay in days
             * @description The number of days between recurring schedule triggers.
             */
            schedule_recurring_interval_days?: number;
            /**
             * @default [
             *       1,
             *       2,
             *       3
             *     ]
             */
            sources: components["schemas"]["SourcesEnum"][];
            /** Trigger Type */
            type?: components["schemas"]["WorkflowTriggerTypeEnum"];
        };
        /**
         * @description * `0` - System default
         *     * `1` - Text, then HTML
         *     * `2` - HTML, then text
         *     * `3` - HTML only
         *     * `4` - Text only
         * @enum {integer}
         */
        PdfLayoutEnum: 0 | 1 | 2 | 3 | 4;
        PostDocumentRequest: {
            /**
             * ASN
             * Format: int64
             */
            archive_serial_number?: number;
            correspondent?: number | null;
            /** Format: date-time */
            created?: string | null;
            custom_fields?: unknown;
            /** Format: binary */
            document: string;
            document_type?: number | null;
            /** Documents are from Paperless-ngx WebUI */
            from_webui?: boolean;
            storage_path?: number | null;
            tags?: number[];
            title?: string;
        };
        ProcessedMail: {
            readonly error: string | null;
            readonly folder: string;
            readonly id: number;
            owner?: number | null;
            /** Format: date-time */
            readonly processed: string;
            /** Format: date-time */
            readonly received: string;
            readonly rule: number;
            readonly status: string;
            readonly subject: string;
            readonly uid: string;
        };
        Profile: {
            readonly auth_token: string;
            email?: string;
            first_name?: string;
            readonly has_usable_password: boolean;
            readonly is_mfa_enabled: boolean;
            last_name?: string;
            password?: string;
            readonly social_accounts: components["schemas"]["SocialAccount"][];
        };
        RebuildBundleError: {
            detail: string;
        };
        /**
         * @description * `azureai` - Azure AI Document Intelligence
         * @enum {string}
         */
        RemoteOcrEngineEnum: "azureai";
        /**
         * @description * `always` - All supported documents
         *     * `workflow_only` - Only when a workflow enables it
         * @enum {string}
         */
        RemoteOcrModeEnum: "always" | "workflow_only";
        RemovePasswordDocumentsRequest: {
            /** @default false */
            delete_original: boolean;
            documents: number[];
            /** @default false */
            from_webui: boolean;
            /** @default true */
            include_metadata: boolean;
            password: string;
            /** @default latest_version */
            source_mode: string;
            /** @default false */
            update_document: boolean;
        };
        RemovePasswordDocumentsResult: {
            result: string;
        };
        ReprocessDocumentsRequest: {
            /** @default false */
            all: boolean;
            documents?: number[];
            filters?: {
                [key: string]: unknown;
            };
            /** @default false */
            remote_ocr: boolean;
        };
        ReprocessDocumentsResult: {
            result: string;
        };
        RotateDocumentsRequest: {
            /** @default false */
            all: boolean;
            degrees: number;
            documents?: number[];
            filters?: {
                [key: string]: unknown;
            };
            /** @default false */
            from_webui: boolean;
            /** @default latest_version */
            source_mode: string;
        };
        RotateDocumentsResult: {
            result: string;
        };
        /**
         * @description * `0` - title contains
         *     * `1` - content contains
         *     * `2` - ASN is
         *     * `3` - correspondent is
         *     * `4` - document type is
         *     * `5` - is in inbox
         *     * `6` - has tag
         *     * `7` - has any tag
         *     * `8` - created before
         *     * `9` - created after
         *     * `10` - created year is
         *     * `11` - created month is
         *     * `12` - created day is
         *     * `13` - added before
         *     * `14` - added after
         *     * `15` - modified before
         *     * `16` - modified after
         *     * `17` - does not have tag
         *     * `18` - does not have ASN
         *     * `19` - title or content contains
         *     * `20` - fulltext query
         *     * `21` - more like this
         *     * `22` - has tags in
         *     * `23` - ASN greater than
         *     * `24` - ASN less than
         *     * `25` - storage path is
         *     * `26` - has correspondent in
         *     * `27` - does not have correspondent in
         *     * `28` - has document type in
         *     * `29` - does not have document type in
         *     * `30` - has storage path in
         *     * `31` - does not have storage path in
         *     * `32` - owner is
         *     * `33` - has owner in
         *     * `34` - does not have owner
         *     * `35` - does not have owner in
         *     * `36` - has custom field value
         *     * `37` - is shared by me
         *     * `38` - has custom fields
         *     * `39` - has custom field in
         *     * `40` - does not have custom field in
         *     * `41` - does not have custom field
         *     * `42` - custom fields query
         *     * `43` - created to
         *     * `44` - created from
         *     * `45` - added to
         *     * `46` - added from
         *     * `47` - mime type is
         *     * `48` - simple title search
         *     * `49` - simple text search
         * @enum {integer}
         */
        RuleTypeEnum: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49;
        RunTask: {
            task_id: string;
        };
        RunTaskError: {
            error: string;
        };
        RunTaskRequest: {
            task_type: components["schemas"]["TaskTypeEnum"];
        };
        SanityCheck: {
            error: string;
            /** Format: date-time */
            last_run: string;
            status: string;
        };
        SavedView: {
            /** Document display fields */
            display_fields?: unknown;
            /** View display mode */
            display_mode?: (components["schemas"]["DisplayModeEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            filter_rules: components["schemas"]["SavedViewFilterRule"][];
            icon?: components["schemas"]["IconEnum"];
            readonly id: number;
            name: string;
            owner?: number | null;
            /** View page size */
            page_size?: number | null;
            readonly permissions: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
            sort_field?: string | null;
            sort_reverse?: boolean;
            readonly user_can_change: boolean;
        };
        SavedViewFilterRule: {
            rule_type: components["schemas"]["RuleTypeEnum"];
            value?: string | null;
        };
        SavedViewFilterRuleRequest: {
            rule_type: components["schemas"]["RuleTypeEnum"];
            value?: string | null;
        };
        SavedViewRequest: {
            /** Document display fields */
            display_fields?: unknown;
            /** View display mode */
            display_mode?: (components["schemas"]["DisplayModeEnum"] | components["schemas"]["BlankEnum"] | components["schemas"]["NullEnum"]) | null;
            filter_rules: components["schemas"]["SavedViewFilterRuleRequest"][];
            icon?: components["schemas"]["IconEnum"];
            name: string;
            owner?: number | null;
            /** View page size */
            page_size?: number | null;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
            sort_field?: string | null;
            sort_reverse?: boolean;
        };
        /**
         * @description * `added` - Added
         *     * `created` - Created
         *     * `modified` - Modified
         *     * `custom_field` - Custom Field
         * @enum {string}
         */
        ScheduleDateFieldEnum: "added" | "created" | "modified" | "custom_field";
        SearchResult: {
            correspondents: components["schemas"]["Correspondent"][];
            custom_fields: components["schemas"]["CustomField"][];
            document_types: components["schemas"]["DocumentType"][];
            documents: components["schemas"]["Document"][];
            groups: components["schemas"]["Group"][];
            mail_accounts: components["schemas"]["MailAccount"][];
            mail_rules: components["schemas"]["MailRule"][];
            saved_views: components["schemas"]["SavedView"][];
            storage_paths: components["schemas"]["StoragePath"][];
            tags: components["schemas"]["Tag"][];
            total: number;
            users: components["schemas"]["User"][];
            workflows: components["schemas"]["Workflow"][];
        };
        SelectionData: {
            selected_correspondents: components["schemas"]["CorrespondentCounts"][];
            selected_custom_fields: components["schemas"]["CustomFieldCounts"][];
            selected_document_types: components["schemas"]["DocumentTypeCounts"][];
            selected_storage_paths: components["schemas"]["StoragePathCounts"][];
            selected_tags: components["schemas"]["TagCounts"][];
        };
        ShareLink: {
            /** Format: date-time */
            readonly created: string;
            document?: number;
            /** Format: date-time */
            expiration?: string | null;
            file_version?: components["schemas"]["FileVersionEnum"];
            readonly id: number;
            readonly slug: string;
        };
        ShareLinkBundle: {
            /** Format: date-time */
            readonly built_at: string | null;
            /** Format: date-time */
            readonly created: string;
            readonly document_count: number;
            readonly documents: number[];
            /** Format: date-time */
            readonly expiration: string | null;
            file_version?: components["schemas"]["FileVersionEnum"];
            readonly id: number;
            readonly last_error: unknown;
            /** Size (bytes) */
            readonly size_bytes: number | null;
            readonly slug: string;
            readonly status: components["schemas"]["ShareLinkBundleStatusEnum"];
        };
        ShareLinkBundleRequest: {
            document_ids: number[];
            expiration_days?: number | null;
            file_version?: components["schemas"]["FileVersionEnum"];
        };
        /**
         * @description * `pending` - Pending
         *     * `processing` - Processing
         *     * `ready` - Ready
         *     * `failed` - Failed
         * @enum {string}
         */
        ShareLinkBundleStatusEnum: "pending" | "processing" | "ready" | "failed";
        ShareLinkRequest: {
            document?: number;
            /** Format: date-time */
            expiration?: string | null;
            file_version?: components["schemas"]["FileVersionEnum"];
        };
        SocialAccount: {
            readonly id: number;
            readonly name: string;
            provider: string;
        };
        SocialAccountRequest: {
            provider: string;
        };
        /**
         * @description * `1` - Consume Folder
         *     * `2` - Api Upload
         *     * `3` - Mail Fetch
         *     * `4` - Web UI
         * @enum {integer}
         */
        SourcesEnum: 1 | 2 | 3 | 4;
        Storage: {
            available: number;
            total: number;
        };
        StoragePath: {
            readonly document_count: number;
            readonly id: number;
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["MatchingAlgorithm"];
            name: string;
            owner?: number | null;
            path: string;
            readonly slug: string;
            readonly user_can_change: boolean;
        };
        StoragePathCounts: {
            document_count: number;
            id: number;
        };
        StoragePathRequest: {
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["MatchingAlgorithm"];
            name: string;
            owner?: number | null;
            path: string;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
        };
        StoragePathTestRequest: {
            document: number;
            path: string;
        };
        Suggestions: {
            correspondents: number[];
            dates: string[];
            document_types: number[];
            storage_paths: number[];
            tags: number[];
        };
        SystemStatus: {
            classifier: components["schemas"]["Classifier"];
            database: components["schemas"]["Database"];
            index: components["schemas"]["Index"];
            install_type: string;
            pngx_version: string;
            sanity_check: components["schemas"]["SanityCheck"];
            server_os: string;
            storage: components["schemas"]["Storage"];
            tasks: components["schemas"]["Tasks"];
        };
        Tag: {
            readonly children: number[];
            color?: string;
            readonly document_count: number;
            readonly id: number;
            /** @description Marks this tag as an inbox tag: All newly consumed documents will be tagged with inbox tags. */
            is_inbox_tag?: boolean;
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["MatchingAlgorithm"];
            name: string;
            owner?: number | null;
            parent?: number | null;
            readonly slug: string;
            readonly text_color: string;
            readonly user_can_change: boolean;
        };
        TagCounts: {
            document_count: number;
            id: number;
        };
        TagRequest: {
            color?: string;
            /** @description Marks this tag as an inbox tag: All newly consumed documents will be tagged with inbox tags. */
            is_inbox_tag?: boolean;
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["MatchingAlgorithm"];
            name: string;
            owner?: number | null;
            parent?: number | null;
            set_permissions?: {
                change?: {
                    groups?: number[];
                    users?: number[];
                };
                view?: {
                    groups?: number[];
                    users?: number[];
                };
            };
        };
        Tasks: {
            celery_status: string;
            redis_error: string;
            redis_status: string;
            redis_url: string;
            summary: components["schemas"]["TasksSummaryOverview"];
        };
        /** @description Task serializer for API v10+ using new field names. */
        TaskSerializerV10: {
            readonly acknowledged: boolean;
            /**
             * Created
             * Format: date-time
             */
            readonly date_created: string;
            /**
             * Completed
             * Format: date-time
             */
            readonly date_done: string | null;
            /**
             * Started
             * Format: date-time
             */
            readonly date_started: string | null;
            /**
             * Duration (seconds)
             * Format: double
             * @description Elapsed time from start to completion
             */
            readonly duration_seconds: number | null;
            readonly id: number;
            /** @description Structured input parameters for the task */
            readonly input_data: unknown;
            readonly owner: number | null;
            readonly related_document_ids: number[];
            /** @description Structured result data from task execution */
            readonly result_data: unknown;
            readonly status: components["schemas"]["TaskSerializerV10StatusEnum"];
            readonly status_display: string;
            /** @description Celery task ID */
            readonly task_id: string;
            /**
             * @description The kind of work being performed
             *
             *     * `consume_file` - Consume File
             *     * `train_classifier` - Train Classifier
             *     * `sanity_check` - Sanity Check
             *     * `index_optimize` - Index Optimize
             *     * `mail_fetch` - Mail Fetch
             *     * `llm_index` - LLM Index
             *     * `empty_trash` - Empty Trash
             *     * `check_workflows` - Check Workflows
             *     * `bulk_update` - Bulk Update
             *     * `reprocess_document` - Reprocess Document
             *     * `build_share_link` - Build Share Link
             *     * `bulk_delete` - Bulk Delete
             *     * `apply_ai_suggestions` - Apply AI Suggestions
             */
            readonly task_type: components["schemas"]["TaskTypeEnum"];
            readonly task_type_display: string;
            /**
             * @description What initiated this task
             *
             *     * `scheduled` - Scheduled
             *     * `web_ui` - Web UI
             *     * `api_upload` - API Upload
             *     * `folder_consume` - Folder Consume
             *     * `email_consume` - Email Consume
             *     * `system` - System
             *     * `manual` - Manual
             */
            readonly trigger_source: components["schemas"]["TriggerSourceEnum"];
            readonly trigger_source_display: string;
            /**
             * Wait Time (seconds)
             * Format: double
             * @description Time from task creation to worker pickup
             */
            readonly wait_time_seconds: number | null;
        };
        /**
         * @description * `pending` - Pending
         *     * `started` - Started
         *     * `success` - Success
         *     * `failure` - Failure
         *     * `revoked` - Revoked
         * @enum {string}
         */
        TaskSerializerV10StatusEnum: "pending" | "started" | "success" | "failure" | "revoked";
        TasksSummaryOverview: {
            days: number;
            failure_count: number;
            pending_count: number;
            success_count: number;
            total_count: number;
        };
        TaskStatusCounts: {
            all: number;
            completed: number;
            in_progress: number;
            needs_attention: number;
        };
        TaskSummary: {
            /** Format: double */
            avg_duration_seconds: number | null;
            /** Format: double */
            avg_wait_time_seconds: number | null;
            failure_count: number;
            /** Format: date-time */
            last_failure: string | null;
            /** Format: date-time */
            last_run: string | null;
            /** Format: date-time */
            last_success: string | null;
            pending_count: number;
            success_count: number;
            task_type: string;
            total_count: number;
        };
        /**
         * @description * `consume_file` - Consume File
         *     * `train_classifier` - Train Classifier
         *     * `sanity_check` - Sanity Check
         *     * `index_optimize` - Index Optimize
         *     * `mail_fetch` - Mail Fetch
         *     * `llm_index` - LLM Index
         *     * `empty_trash` - Empty Trash
         *     * `check_workflows` - Check Workflows
         *     * `bulk_update` - Bulk Update
         *     * `reprocess_document` - Reprocess Document
         *     * `build_share_link` - Build Share Link
         *     * `bulk_delete` - Bulk Delete
         *     * `apply_ai_suggestions` - Apply AI Suggestions
         * @enum {string}
         */
        TaskTypeEnum: "consume_file" | "train_classifier" | "sanity_check" | "index_optimize" | "mail_fetch" | "llm_index" | "empty_trash" | "check_workflows" | "bulk_update" | "reprocess_document" | "build_share_link" | "bulk_delete" | "apply_ai_suggestions";
        /**
         * @description * `restore` - restore
         *     * `empty` - empty
         * @enum {string}
         */
        TrashActionEnum: "restore" | "empty";
        TrashRequest: {
            action: components["schemas"]["TrashActionEnum"];
            documents?: number[];
        };
        /**
         * @description * `scheduled` - Scheduled
         *     * `web_ui` - Web UI
         *     * `api_upload` - API Upload
         *     * `folder_consume` - Folder Consume
         *     * `email_consume` - Email Consume
         *     * `system` - System
         *     * `manual` - Manual
         * @enum {string}
         */
        TriggerSourceEnum: "scheduled" | "web_ui" | "api_upload" | "folder_consume" | "email_consume" | "system" | "manual";
        UiSettingsView: {
            readonly id: number;
            settings?: {
                [key: string]: unknown;
            } | null;
        };
        UiSettingsViewRequest: {
            settings?: {
                [key: string]: unknown;
            } | null;
        };
        /**
         * @description * `clean` - clean
         *     * `clean-final` - clean-final
         *     * `none` - none
         * @enum {string}
         */
        UnpaperCleanEnum: "clean" | "clean-final" | "none";
        UpdateDocumentVersionLabelResult: {
            /** Format: date-time */
            added: string;
            checksum?: string | null;
            id: number;
            is_root: boolean;
            version_label?: string | null;
        };
        User: {
            /** Format: date-time */
            date_joined?: string;
            /** Email address */
            email?: string;
            first_name?: string;
            /** @description The groups this user belongs to. A user will get all permissions granted to each of their groups. */
            groups?: number[];
            readonly id: number;
            readonly inherited_permissions: string[];
            /**
             * Active
             * @description Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
             */
            is_active?: boolean;
            readonly is_mfa_enabled: boolean;
            /**
             * Staff status
             * @description Designates whether the user can log into this admin site.
             */
            is_staff?: boolean;
            /**
             * Superuser status
             * @description Designates that this user has all permissions without explicitly assigning them.
             */
            is_superuser?: boolean;
            last_name?: string;
            password?: string;
            user_permissions?: string[];
            /** @description Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
            username: string;
        };
        UserRequest: {
            /** Format: date-time */
            date_joined?: string;
            /** Email address */
            email?: string;
            first_name?: string;
            /** @description The groups this user belongs to. A user will get all permissions granted to each of their groups. */
            groups?: number[];
            /**
             * Active
             * @description Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
             */
            is_active?: boolean;
            /**
             * Staff status
             * @description Designates whether the user can log into this admin site.
             */
            is_staff?: boolean;
            /**
             * Superuser status
             * @description Designates that this user has all permissions without explicitly assigning them.
             */
            is_superuser?: boolean;
            last_name?: string;
            password?: string;
            user_permissions?: string[];
            /** @description Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
            username: string;
        };
        Workflow: {
            actions: components["schemas"]["WorkflowAction"][];
            enabled?: boolean;
            readonly id: number;
            name: string;
            order?: number;
            triggers: components["schemas"]["WorkflowTrigger"][];
        };
        WorkflowAction: {
            /**
             * Create missing objects
             * @description Create suggested tags, correspondents, document types and storage paths that do not already exist instead of skipping them.
             */
            ai_create_missing?: boolean;
            /**
             * Overwrite existing values
             * @description Apply suggestions even if the document already has a value for that field. Tags are always added to, never replaced.
             */
            ai_overwrite_existing?: boolean;
            /** @description Which of the AI-suggested fields to apply to the document. */
            ai_suggestion_fields?: unknown;
            /** Grant change permissions to these groups */
            assign_change_groups?: number[];
            /** Grant change permissions to these users */
            assign_change_users?: number[];
            assign_correspondent?: number | null;
            /** Assign these custom fields */
            assign_custom_fields?: number[];
            /**
             * Custom field values
             * @description Optional values to assign to the custom fields.
             */
            assign_custom_fields_values?: unknown;
            assign_document_type?: number | null;
            /** Assign this owner */
            assign_owner?: number | null;
            assign_storage_path?: number | null;
            assign_tags?: (number | null)[];
            /** @description Assign a document title, must  be a Jinja2 template, see documentation. */
            assign_title?: string | null;
            /** Grant view permissions to these groups */
            assign_view_groups?: number[];
            /** Grant view permissions to these users */
            assign_view_users?: number[];
            email?: components["schemas"]["WorkflowActionEmail"] | null;
            id?: number | null;
            /** @description Passwords to try when removing PDF protection. Separate with commas or new lines. */
            passwords?: unknown;
            remove_all_correspondents?: boolean;
            remove_all_custom_fields?: boolean;
            remove_all_document_types?: boolean;
            remove_all_owners?: boolean;
            remove_all_permissions?: boolean;
            remove_all_storage_paths?: boolean;
            remove_all_tags?: boolean;
            /** Remove change permissions for these groups */
            remove_change_groups?: number[];
            /** Remove change permissions for these users */
            remove_change_users?: number[];
            /** Remove these correspondent(s) */
            remove_correspondents?: number[];
            /** Remove these custom fields */
            remove_custom_fields?: number[];
            /** Remove these document type(s) */
            remove_document_types?: number[];
            /** Remove these owner(s) */
            remove_owners?: number[];
            /** Remove these storage path(s) */
            remove_storage_paths?: number[];
            /** Remove these tag(s) */
            remove_tags?: number[];
            /** Remove view permissions for these groups */
            remove_view_groups?: number[];
            /** Remove view permissions for these users */
            remove_view_users?: number[];
            /** Workflow Action Type */
            type?: components["schemas"]["WorkflowActionTypeEnum"];
            webhook?: components["schemas"]["WorkflowActionWebhook"] | null;
        };
        WorkflowActionEmail: {
            /**
             * Email body
             * @description The body (message) of the email, can include some placeholders, see documentation.
             */
            body: string;
            id?: number | null;
            /** Include document in email */
            include_document?: boolean;
            /**
             * Email subject
             * @description The subject of the email, can include some placeholders, see documentation.
             */
            subject: string;
            /**
             * Emails to
             * @description The destination email addresses, comma separated.
             */
            to: string;
        };
        WorkflowActionEmailRequest: {
            /**
             * Email body
             * @description The body (message) of the email, can include some placeholders, see documentation.
             */
            body: string;
            id?: number | null;
            /** Include document in email */
            include_document?: boolean;
            /**
             * Email subject
             * @description The subject of the email, can include some placeholders, see documentation.
             */
            subject: string;
            /**
             * Emails to
             * @description The destination email addresses, comma separated.
             */
            to: string;
        };
        WorkflowActionRequest: {
            /**
             * Create missing objects
             * @description Create suggested tags, correspondents, document types and storage paths that do not already exist instead of skipping them.
             */
            ai_create_missing?: boolean;
            /**
             * Overwrite existing values
             * @description Apply suggestions even if the document already has a value for that field. Tags are always added to, never replaced.
             */
            ai_overwrite_existing?: boolean;
            /** @description Which of the AI-suggested fields to apply to the document. */
            ai_suggestion_fields?: unknown;
            /** Grant change permissions to these groups */
            assign_change_groups?: number[];
            /** Grant change permissions to these users */
            assign_change_users?: number[];
            assign_correspondent?: number | null;
            /** Assign these custom fields */
            assign_custom_fields?: number[];
            /**
             * Custom field values
             * @description Optional values to assign to the custom fields.
             */
            assign_custom_fields_values?: unknown;
            assign_document_type?: number | null;
            /** Assign this owner */
            assign_owner?: number | null;
            assign_storage_path?: number | null;
            assign_tags?: (number | null)[];
            /** @description Assign a document title, must  be a Jinja2 template, see documentation. */
            assign_title?: string | null;
            /** Grant view permissions to these groups */
            assign_view_groups?: number[];
            /** Grant view permissions to these users */
            assign_view_users?: number[];
            email?: components["schemas"]["WorkflowActionEmailRequest"] | null;
            id?: number | null;
            /** @description Passwords to try when removing PDF protection. Separate with commas or new lines. */
            passwords?: unknown;
            remove_all_correspondents?: boolean;
            remove_all_custom_fields?: boolean;
            remove_all_document_types?: boolean;
            remove_all_owners?: boolean;
            remove_all_permissions?: boolean;
            remove_all_storage_paths?: boolean;
            remove_all_tags?: boolean;
            /** Remove change permissions for these groups */
            remove_change_groups?: number[];
            /** Remove change permissions for these users */
            remove_change_users?: number[];
            /** Remove these correspondent(s) */
            remove_correspondents?: number[];
            /** Remove these custom fields */
            remove_custom_fields?: number[];
            /** Remove these document type(s) */
            remove_document_types?: number[];
            /** Remove these owner(s) */
            remove_owners?: number[];
            /** Remove these storage path(s) */
            remove_storage_paths?: number[];
            /** Remove these tag(s) */
            remove_tags?: number[];
            /** Remove view permissions for these groups */
            remove_view_groups?: number[];
            /** Remove view permissions for these users */
            remove_view_users?: number[];
            /** Workflow Action Type */
            type?: components["schemas"]["WorkflowActionTypeEnum"];
            webhook?: components["schemas"]["WorkflowActionWebhookRequest"] | null;
        };
        /**
         * @description * `1` - Assignment
         *     * `2` - Removal
         *     * `3` - Email
         *     * `4` - Webhook
         *     * `5` - Password removal
         *     * `6` - Move to trash
         *     * `7` - Remote OCR
         *     * `8` - Apply AI suggestions
         * @enum {integer}
         */
        WorkflowActionTypeEnum: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
        WorkflowActionWebhook: {
            /** Send as JSON */
            as_json?: boolean;
            /**
             * Webhook body
             * @description The body to send with the webhook URL if parameters not used.
             */
            body?: string | null;
            /**
             * Webhook headers
             * @description The headers to send with the webhook URL.
             */
            headers?: unknown;
            id?: number | null;
            /** Include document in webhook */
            include_document?: boolean;
            /**
             * Webhook parameters
             * @description The parameters to send with the webhook URL if body not used.
             */
            params?: unknown;
            /**
             * Webhook url
             * @description The destination URL for the notification.
             */
            url: string;
            /** Use parameters */
            use_params?: boolean;
        };
        WorkflowActionWebhookRequest: {
            /** Send as JSON */
            as_json?: boolean;
            /**
             * Webhook body
             * @description The body to send with the webhook URL if parameters not used.
             */
            body?: string | null;
            /**
             * Webhook headers
             * @description The headers to send with the webhook URL.
             */
            headers?: unknown;
            id?: number | null;
            /** Include document in webhook */
            include_document?: boolean;
            /**
             * Webhook parameters
             * @description The parameters to send with the webhook URL if body not used.
             */
            params?: unknown;
            /**
             * Webhook url
             * @description The destination URL for the notification.
             */
            url: string;
            /** Use parameters */
            use_params?: boolean;
        };
        WorkflowRequest: {
            actions: components["schemas"]["WorkflowActionRequest"][];
            enabled?: boolean;
            name: string;
            order?: number;
            triggers: components["schemas"]["WorkflowTriggerRequest"][];
        };
        WorkflowTrigger: {
            /** @description JSON-encoded custom field query expression. */
            filter_custom_field_query?: string | null;
            /** @description Only consume documents which entirely match this filename if specified. Wildcards such as *.pdf or *invoice* are allowed. Case insensitive. */
            filter_filename?: string | null;
            /** Has all of these tag(s) */
            filter_has_all_tags?: number[];
            /** Has one of these correspondents */
            filter_has_any_correspondents?: number[];
            /** Has one of these document types */
            filter_has_any_document_types?: number[];
            /** Has one of these storage paths */
            filter_has_any_storage_paths?: number[];
            /** Has this correspondent */
            filter_has_correspondent?: number | null;
            /** Has this document type */
            filter_has_document_type?: number | null;
            /** Does not have these correspondent(s) */
            filter_has_not_correspondents?: number[];
            /** Does not have these document type(s) */
            filter_has_not_document_types?: number[];
            /** Does not have these storage path(s) */
            filter_has_not_storage_paths?: number[];
            /** Does not have these tag(s) */
            filter_has_not_tags?: number[];
            /** Has this storage path */
            filter_has_storage_path?: number | null;
            /** Has these tag(s) */
            filter_has_tags?: number[];
            /** Filter documents from this mail rule */
            filter_mailrule?: number | null;
            /** @description Only consume documents with a path that matches this if specified. Wildcards specified as * are allowed. Case insensitive. */
            filter_path?: string | null;
            id?: number | null;
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["WorkflowTriggerMatchingAlgorithmEnum"];
            schedule_date_custom_field?: number | null;
            /**
             * @description The field to check for a schedule trigger.
             *
             *     * `added` - Added
             *     * `created` - Created
             *     * `modified` - Modified
             *     * `custom_field` - Custom Field
             */
            schedule_date_field?: components["schemas"]["ScheduleDateFieldEnum"];
            /** @description If the schedule should be recurring. */
            schedule_is_recurring?: boolean;
            /** @description The number of days to offset the schedule trigger by. */
            schedule_offset_days?: number;
            /**
             * Schedule recurring delay in days
             * @description The number of days between recurring schedule triggers.
             */
            schedule_recurring_interval_days?: number;
            /**
             * @default [
             *       1,
             *       2,
             *       3
             *     ]
             */
            sources: components["schemas"]["SourcesEnum"][];
            /** Trigger Type */
            type: components["schemas"]["WorkflowTriggerTypeEnum"];
        };
        /**
         * @description * `0` - None
         *     * `1` - Any word
         *     * `2` - All words
         *     * `3` - Exact match
         *     * `4` - Regular expression
         *     * `5` - Fuzzy word
         * @enum {integer}
         */
        WorkflowTriggerMatchingAlgorithmEnum: 0 | 1 | 2 | 3 | 4 | 5;
        WorkflowTriggerRequest: {
            /** @description JSON-encoded custom field query expression. */
            filter_custom_field_query?: string | null;
            /** @description Only consume documents which entirely match this filename if specified. Wildcards such as *.pdf or *invoice* are allowed. Case insensitive. */
            filter_filename?: string | null;
            /** Has all of these tag(s) */
            filter_has_all_tags?: number[];
            /** Has one of these correspondents */
            filter_has_any_correspondents?: number[];
            /** Has one of these document types */
            filter_has_any_document_types?: number[];
            /** Has one of these storage paths */
            filter_has_any_storage_paths?: number[];
            /** Has this correspondent */
            filter_has_correspondent?: number | null;
            /** Has this document type */
            filter_has_document_type?: number | null;
            /** Does not have these correspondent(s) */
            filter_has_not_correspondents?: number[];
            /** Does not have these document type(s) */
            filter_has_not_document_types?: number[];
            /** Does not have these storage path(s) */
            filter_has_not_storage_paths?: number[];
            /** Does not have these tag(s) */
            filter_has_not_tags?: number[];
            /** Has this storage path */
            filter_has_storage_path?: number | null;
            /** Has these tag(s) */
            filter_has_tags?: number[];
            /** Filter documents from this mail rule */
            filter_mailrule?: number | null;
            /** @description Only consume documents with a path that matches this if specified. Wildcards specified as * are allowed. Case insensitive. */
            filter_path?: string | null;
            id?: number | null;
            is_insensitive?: boolean;
            match?: string;
            matching_algorithm?: components["schemas"]["WorkflowTriggerMatchingAlgorithmEnum"];
            schedule_date_custom_field?: number | null;
            /**
             * @description The field to check for a schedule trigger.
             *
             *     * `added` - Added
             *     * `created` - Created
             *     * `modified` - Modified
             *     * `custom_field` - Custom Field
             */
            schedule_date_field?: components["schemas"]["ScheduleDateFieldEnum"];
            /** @description If the schedule should be recurring. */
            schedule_is_recurring?: boolean;
            /** @description The number of days to offset the schedule trigger by. */
            schedule_offset_days?: number;
            /**
             * Schedule recurring delay in days
             * @description The number of days between recurring schedule triggers.
             */
            schedule_recurring_interval_days?: number;
            /**
             * @default [
             *       1,
             *       2,
             *       3
             *     ]
             */
            sources: components["schemas"]["SourcesEnum"][];
            /** Trigger Type */
            type: components["schemas"]["WorkflowTriggerTypeEnum"];
        };
        /**
         * @description * `1` - Consumption Started
         *     * `2` - Document Added
         *     * `3` - Document Updated
         *     * `4` - Scheduled
         * @enum {integer}
         */
        WorkflowTriggerTypeEnum: 1 | 2 | 3 | 4;
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    bulk_edit_objects: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BulkEditObjectsRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BulkEditResult"];
                };
            };
        };
    };
    config_list: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApplicationConfiguration"][];
                };
            };
        };
    };
    config_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this paperless application settings. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApplicationConfiguration"];
                };
            };
        };
    };
    config_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this paperless application settings. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ApplicationConfigurationRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["ApplicationConfigurationRequest"];
                "multipart/form-data": components["schemas"]["ApplicationConfigurationRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApplicationConfiguration"];
                };
            };
        };
    };
    config_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this paperless application settings. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    config_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this paperless application settings. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedApplicationConfigurationRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedApplicationConfigurationRequest"];
                "multipart/form-data": components["schemas"]["PatchedApplicationConfigurationRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApplicationConfiguration"];
                };
            };
        };
    };
    correspondents_list: {
        parameters: {
            query?: {
                full_perms?: boolean;
                id?: number;
                /** @description Multiple values may be separated by commas. */
                id__in?: number[];
                name__icontains?: string;
                name__iendswith?: string;
                name__iexact?: string;
                name__istartswith?: string;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedCorrespondentList"];
                };
            };
        };
    };
    correspondents_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CorrespondentRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["CorrespondentRequest"];
                "multipart/form-data": components["schemas"]["CorrespondentRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Correspondent"];
                };
            };
        };
    };
    correspondents_retrieve: {
        parameters: {
            query?: {
                full_perms?: boolean;
            };
            header?: never;
            path: {
                /** @description A unique integer value identifying this correspondent. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Correspondent"];
                };
            };
        };
    };
    correspondents_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this correspondent. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CorrespondentRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["CorrespondentRequest"];
                "multipart/form-data": components["schemas"]["CorrespondentRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Correspondent"];
                };
            };
        };
    };
    correspondents_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this correspondent. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    correspondents_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this correspondent. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedCorrespondentRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedCorrespondentRequest"];
                "multipart/form-data": components["schemas"]["PatchedCorrespondentRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Correspondent"];
                };
            };
        };
    };
    custom_fields_list: {
        parameters: {
            query?: {
                id?: number;
                /** @description Multiple values may be separated by commas. */
                id__in?: number[];
                name__icontains?: string;
                name__iendswith?: string;
                name__iexact?: string;
                name__istartswith?: string;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedCustomFieldList"];
                };
            };
        };
    };
    custom_fields_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CustomFieldRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["CustomFieldRequest"];
                "multipart/form-data": components["schemas"]["CustomFieldRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomField"];
                };
            };
        };
    };
    custom_fields_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this custom field. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomField"];
                };
            };
        };
    };
    custom_fields_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this custom field. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CustomFieldRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["CustomFieldRequest"];
                "multipart/form-data": components["schemas"]["CustomFieldRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomField"];
                };
            };
        };
    };
    custom_fields_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this custom field. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    custom_fields_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this custom field. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedCustomFieldRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedCustomFieldRequest"];
                "multipart/form-data": components["schemas"]["PatchedCustomFieldRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CustomField"];
                };
            };
        };
    };
    document_types_list: {
        parameters: {
            query?: {
                full_perms?: boolean;
                id?: number;
                /** @description Multiple values may be separated by commas. */
                id__in?: number[];
                name__icontains?: string;
                name__iendswith?: string;
                name__iexact?: string;
                name__istartswith?: string;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedDocumentTypeList"];
                };
            };
        };
    };
    document_types_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DocumentTypeRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["DocumentTypeRequest"];
                "multipart/form-data": components["schemas"]["DocumentTypeRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentType"];
                };
            };
        };
    };
    document_types_retrieve: {
        parameters: {
            query?: {
                full_perms?: boolean;
            };
            header?: never;
            path: {
                /** @description A unique integer value identifying this document type. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentType"];
                };
            };
        };
    };
    document_types_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document type. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DocumentTypeRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["DocumentTypeRequest"];
                "multipart/form-data": components["schemas"]["DocumentTypeRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentType"];
                };
            };
        };
    };
    document_types_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document type. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    document_types_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document type. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedDocumentTypeRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedDocumentTypeRequest"];
                "multipart/form-data": components["schemas"]["PatchedDocumentTypeRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentType"];
                };
            };
        };
    };
    documents_list: {
        parameters: {
            query?: {
                added__date__gt?: string;
                added__date__gte?: string;
                added__date__lt?: string;
                added__date__lte?: string;
                added__day?: number;
                added__gt?: string;
                added__gte?: string;
                added__lt?: string;
                added__lte?: string;
                added__month?: number;
                added__year?: number;
                archive_serial_number?: number;
                archive_serial_number__gt?: number;
                archive_serial_number__gte?: number;
                archive_serial_number__isnull?: boolean;
                archive_serial_number__lt?: number;
                archive_serial_number__lte?: number;
                checksum__icontains?: string;
                checksum__iendswith?: string;
                checksum__iexact?: string;
                checksum__istartswith?: string;
                content__icontains?: string;
                content__iendswith?: string;
                content__iexact?: string;
                content__istartswith?: string;
                correspondent__id?: number;
                /** @description Multiple values may be separated by commas. */
                correspondent__id__in?: number[];
                correspondent__id__none?: number;
                correspondent__isnull?: boolean;
                correspondent__name__icontains?: string;
                correspondent__name__iendswith?: string;
                correspondent__name__iexact?: string;
                correspondent__name__istartswith?: string;
                created__date__gt?: string;
                created__date__gte?: string;
                created__date__lt?: string;
                created__date__lte?: string;
                created__day?: number;
                created__gt?: string;
                created__gte?: string;
                created__lt?: string;
                created__lte?: string;
                created__month?: number;
                created__year?: number;
                custom_field_query?: string;
                custom_fields__icontains?: string;
                custom_fields__id__all?: number;
                custom_fields__id__in?: number;
                custom_fields__id__none?: number;
                document_type__id?: number;
                /** @description Multiple values may be separated by commas. */
                document_type__id__in?: number[];
                document_type__id__none?: number;
                document_type__isnull?: boolean;
                document_type__name__icontains?: string;
                document_type__name__iendswith?: string;
                document_type__name__iexact?: string;
                document_type__name__istartswith?: string;
                fields?: string[];
                full_perms?: boolean;
                /** @description Has custom field */
                has_custom_fields?: boolean;
                id?: number;
                /** @description Multiple values may be separated by commas. */
                id__in?: number[];
                is_in_inbox?: boolean;
                /** @description Is tagged */
                is_tagged?: boolean;
                mime_type?: string;
                modified__date__gt?: string;
                modified__date__gte?: string;
                modified__date__lt?: string;
                modified__date__lte?: string;
                modified__day?: number;
                modified__gt?: string;
                modified__gte?: string;
                modified__lt?: string;
                modified__lte?: string;
                modified__month?: number;
                modified__year?: number;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                original_filename__icontains?: string;
                original_filename__iendswith?: string;
                original_filename__iexact?: string;
                original_filename__istartswith?: string;
                owner__id?: number;
                /** @description Multiple values may be separated by commas. */
                owner__id__in?: number[];
                owner__id__none?: number;
                owner__isnull?: boolean;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
                /** @description Advanced Tantivy search query string */
                query?: string;
                /** @description A search term. */
                search?: string;
                shared_by__id?: boolean;
                storage_path__id?: number;
                /** @description Multiple values may be separated by commas. */
                storage_path__id__in?: number[];
                storage_path__id__none?: number;
                storage_path__isnull?: boolean;
                storage_path__name__icontains?: string;
                storage_path__name__iendswith?: string;
                storage_path__name__iexact?: string;
                storage_path__name__istartswith?: string;
                tags__id?: number;
                tags__id__all?: number;
                tags__id__in?: number;
                tags__id__none?: number;
                tags__name__icontains?: string;
                tags__name__iendswith?: string;
                tags__name__iexact?: string;
                tags__name__istartswith?: string;
                /** @description Simple Tantivy-backed text search query string */
                text?: string;
                title__icontains?: string;
                title__iendswith?: string;
                title__iexact?: string;
                title__istartswith?: string;
                title_content?: string;
                /** @description Simple Tantivy-backed title-only search query string */
                title_search?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedDocumentList"];
                };
            };
        };
    };
    documents_retrieve: {
        parameters: {
            query?: {
                fields?: string[];
                full_perms?: boolean;
            };
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Document"];
                };
            };
            /** @description No response body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DocumentRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["DocumentRequest"];
                "multipart/form-data": components["schemas"]["DocumentRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Document"];
                };
            };
        };
    };
    documents_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedDocumentRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedDocumentRequest"];
                "multipart/form-data": components["schemas"]["PatchedDocumentRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Document"];
                };
            };
        };
    };
    documents_ai_suggestions_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AISuggestions"];
                };
            };
            /** @description No response body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_download_retrieve: {
        parameters: {
            query?: {
                /** @description Whether or not to use the filename on disk */
                follow_formatting?: boolean;
                original?: boolean;
            };
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    documents_email_document: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EmailDocumentRequestRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["EmailDocumentRequestRequest"];
                "multipart/form-data": components["schemas"]["EmailDocumentRequestRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EmailDocumentResponse"];
                };
            };
            /** @description No response body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_history_list: {
        parameters: {
            query?: {
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedLogEntryList"];
                };
            };
            /** @description No response body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_metadata_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Metadata"];
                };
            };
            /** @description No response body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_notes_list: {
        parameters: {
            query?: {
                /** @description Note ID to delete (used only for DELETE requests) */
                id?: number;
            };
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Notes"][];
                };
            };
            /** @description No response body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_notes_create: {
        parameters: {
            query?: {
                /** @description Note ID to delete (used only for DELETE requests) */
                id?: number;
            };
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NoteCreateRequestRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["NoteCreateRequestRequest"];
                "multipart/form-data": components["schemas"]["NoteCreateRequestRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Notes"][];
                };
            };
            /** @description No response body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_notes_destroy: {
        parameters: {
            query?: {
                /** @description Note ID to delete (used only for DELETE requests) */
                id?: number;
            };
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Notes"][];
                };
            };
            /** @description No response body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_preview_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    documents_root: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentRootResponse"];
                };
            };
        };
    };
    document_share_links: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** Format: date-time */
                        created?: string;
                        /** Format: date-time */
                        expiration?: string;
                        id?: number;
                        slug?: string;
                    }[];
                };
            };
            /** @description No response body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_suggestions_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Suggestions"];
                };
            };
            /** @description No response body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_thumb_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    documents_update_version: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["DocumentVersionRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    documents_delete_version: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
                version_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_update_version_label: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this document. */
                id: number;
                version_id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedDocumentVersionLabelRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedDocumentVersionLabelRequest"];
                "multipart/form-data": components["schemas"]["PatchedDocumentVersionLabelRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UpdateDocumentVersionLabelResult"];
                };
            };
        };
    };
    bulk_download: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["BulkDownloadRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/zip": string;
                };
            };
            /** @description No response body */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    bulk_edit: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BulkEditRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BulkEditDocumentsResult"];
                };
            };
        };
    };
    documents_chat_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ChatStreamingRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["ChatStreamingRequest"];
                "multipart/form-data": components["schemas"]["ChatStreamingRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChatStreaming"];
                };
            };
        };
    };
    documents_delete: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["DeleteDocumentsRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DeleteDocumentsResult"];
                };
            };
        };
    };
    documents_edit_pdf: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EditPdfDocumentsRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EditPdfDocumentsResult"];
                };
            };
        };
    };
    email_documents: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["EmailRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["EmailRequest"];
                "multipart/form-data": components["schemas"]["EmailRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["EmailDocumentsResponse"];
                };
            };
            /** @description No response body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    documents_merge_as_versions: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MergeDocumentsAsVersionsRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MergeDocumentsAsVersionsResult"];
                };
            };
        };
    };
    documents_merge: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MergeDocumentsRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MergeDocumentsResult"];
                };
            };
        };
    };
    documents_next_asn_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": number;
                };
            };
        };
    };
    documents_post_document_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["PostDocumentRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    documents_remove_password: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RemovePasswordDocumentsRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RemovePasswordDocumentsResult"];
                };
            };
        };
    };
    documents_reprocess: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["ReprocessDocumentsRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ReprocessDocumentsResult"];
                };
            };
        };
    };
    documents_rotate: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RotateDocumentsRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RotateDocumentsResult"];
                };
            };
        };
    };
    documents_selection_data_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DocumentListRequest"];
                "multipart/form-data": components["schemas"]["DocumentListRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SelectionData"];
                };
            };
        };
    };
    groups_list: {
        parameters: {
            query?: {
                name__icontains?: string;
                name__iendswith?: string;
                name__iexact?: string;
                name__istartswith?: string;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedGroupList"];
                };
            };
        };
    };
    groups_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GroupRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["GroupRequest"];
                "multipart/form-data": components["schemas"]["GroupRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Group"];
                };
            };
        };
    };
    groups_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this group. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Group"];
                };
            };
        };
    };
    groups_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this group. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GroupRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["GroupRequest"];
                "multipart/form-data": components["schemas"]["GroupRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Group"];
                };
            };
        };
    };
    groups_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this group. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    groups_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this group. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedGroupRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedGroupRequest"];
                "multipart/form-data": components["schemas"]["PatchedGroupRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Group"];
                };
            };
        };
    };
    logs_list: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string[];
                };
            };
        };
    };
    retrieve_log: {
        parameters: {
            query?: {
                /** @description Return only the last N entries from the log file */
                limit?: number;
            };
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string[];
                };
            };
            /** @description No response body */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    mail_accounts_list: {
        parameters: {
            query?: {
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedMailAccountList"];
                };
            };
        };
    };
    mail_accounts_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MailAccountRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["MailAccountRequest"];
                "multipart/form-data": components["schemas"]["MailAccountRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MailAccount"];
                };
            };
        };
    };
    mail_accounts_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this mail account. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MailAccount"];
                };
            };
        };
    };
    mail_accounts_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this mail account. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MailAccountRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["MailAccountRequest"];
                "multipart/form-data": components["schemas"]["MailAccountRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MailAccount"];
                };
            };
        };
    };
    mail_accounts_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this mail account. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    mail_accounts_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this mail account. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedMailAccountRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedMailAccountRequest"];
                "multipart/form-data": components["schemas"]["PatchedMailAccountRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MailAccount"];
                };
            };
        };
    };
    mail_account_process: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this mail account. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MailAccountRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["MailAccountRequest"];
                "multipart/form-data": components["schemas"]["MailAccountRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MailAccountProcessResponse"];
                };
            };
            /** @description No response body */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    mail_account_test: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MailAccountRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["MailAccountRequest"];
                "multipart/form-data": components["schemas"]["MailAccountRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MailAccountTestResponse"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    mail_rules_list: {
        parameters: {
            query?: {
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedMailRuleList"];
                };
            };
        };
    };
    mail_rules_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MailRuleRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["MailRuleRequest"];
                "multipart/form-data": components["schemas"]["MailRuleRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MailRule"];
                };
            };
        };
    };
    mail_rules_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this mail rule. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MailRule"];
                };
            };
        };
    };
    mail_rules_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this mail rule. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MailRuleRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["MailRuleRequest"];
                "multipart/form-data": components["schemas"]["MailRuleRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MailRule"];
                };
            };
        };
    };
    mail_rules_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this mail rule. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    mail_rules_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this mail rule. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedMailRuleRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedMailRuleRequest"];
                "multipart/form-data": components["schemas"]["PatchedMailRuleRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MailRule"];
                };
            };
        };
    };
    oauth_callback_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    processed_mail_list: {
        parameters: {
            query?: {
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
                rule?: number;
                status?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedProcessedMailList"];
                };
            };
        };
    };
    processed_mail_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this processed mail. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProcessedMail"];
                };
            };
        };
    };
    processed_mail_bulk_delete: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BulkDeleteMailRequestRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["BulkDeleteMailRequestRequest"];
                "multipart/form-data": components["schemas"]["BulkDeleteMailRequestRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BulkDeleteMailResponse"];
                };
            };
            /** @description No response body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No response body */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    profile_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Profile"];
                };
            };
        };
    };
    profile_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedProfileRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedProfileRequest"];
                "multipart/form-data": components["schemas"]["PatchedProfileRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Profile"];
                };
            };
        };
    };
    profile_disconnect_social_account_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    id: number;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": number;
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    profile_generate_auth_token_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    profile_social_account_providers_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: unknown;
                    };
                };
            };
        };
    };
    profile_totp_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: unknown;
                    };
                };
            };
        };
    };
    profile_totp_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    code: string;
                    secret: string;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: unknown;
                    };
                };
            };
        };
    };
    profile_totp_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    remote_version_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: unknown;
                    };
                };
            };
        };
    };
    saved_views_list: {
        parameters: {
            query?: {
                full_perms?: boolean;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedSavedViewList"];
                };
            };
        };
    };
    saved_views_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SavedViewRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["SavedViewRequest"];
                "multipart/form-data": components["schemas"]["SavedViewRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SavedView"];
                };
            };
        };
    };
    saved_views_retrieve: {
        parameters: {
            query?: {
                full_perms?: boolean;
            };
            header?: never;
            path: {
                /** @description A unique integer value identifying this saved view. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SavedView"];
                };
            };
        };
    };
    saved_views_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this saved view. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SavedViewRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["SavedViewRequest"];
                "multipart/form-data": components["schemas"]["SavedViewRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SavedView"];
                };
            };
        };
    };
    saved_views_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this saved view. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    saved_views_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this saved view. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedSavedViewRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedSavedViewRequest"];
                "multipart/form-data": components["schemas"]["PatchedSavedViewRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SavedView"];
                };
            };
        };
    };
    search_retrieve: {
        parameters: {
            query: {
                /** @description Search only the database */
                db_only?: boolean;
                /** @description Query to search for */
                query: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SearchResult"];
                };
            };
        };
    };
    search_autocomplete_list: {
        parameters: {
            query?: {
                /** @description Number of completions to return */
                limit?: number;
                /** @description Term to search for */
                term?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string[];
                };
            };
        };
    };
    share_link_bundles_list: {
        parameters: {
            query?: {
                created__date__gt?: string;
                created__date__gte?: string;
                created__date__lt?: string;
                created__date__lte?: string;
                created__day?: number;
                created__gt?: string;
                created__gte?: string;
                created__lt?: string;
                created__lte?: string;
                created__month?: number;
                created__year?: number;
                documents?: number;
                expiration__date__gt?: string;
                expiration__date__gte?: string;
                expiration__date__lt?: string;
                expiration__date__lte?: string;
                expiration__day?: number;
                expiration__gt?: string;
                expiration__gte?: string;
                expiration__lt?: string;
                expiration__lte?: string;
                expiration__month?: number;
                expiration__year?: number;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
                /**
                 * @description * `pending` - Pending
                 *     * `processing` - Processing
                 *     * `ready` - Ready
                 *     * `failed` - Failed
                 */
                status?: "failed" | "pending" | "processing" | "ready";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedShareLinkBundleList"];
                };
            };
        };
    };
    share_link_bundles_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ShareLinkBundleRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["ShareLinkBundleRequest"];
                "multipart/form-data": components["schemas"]["ShareLinkBundleRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ShareLinkBundle"];
                };
            };
        };
    };
    share_link_bundles_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this share link bundle. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ShareLinkBundle"];
                };
            };
        };
    };
    share_link_bundles_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this share link bundle. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ShareLinkBundleRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["ShareLinkBundleRequest"];
                "multipart/form-data": components["schemas"]["ShareLinkBundleRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ShareLinkBundle"];
                };
            };
        };
    };
    share_link_bundles_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this share link bundle. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    share_link_bundles_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this share link bundle. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedShareLinkBundleRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedShareLinkBundleRequest"];
                "multipart/form-data": components["schemas"]["PatchedShareLinkBundleRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ShareLinkBundle"];
                };
            };
        };
    };
    share_link_bundles_rebuild: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this share link bundle. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ShareLinkBundleRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["ShareLinkBundleRequest"];
                "multipart/form-data": components["schemas"]["ShareLinkBundleRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ShareLinkBundle"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RebuildBundleError"];
                };
            };
        };
    };
    share_links_list: {
        parameters: {
            query?: {
                created__date__gt?: string;
                created__date__gte?: string;
                created__date__lt?: string;
                created__date__lte?: string;
                created__day?: number;
                created__gt?: string;
                created__gte?: string;
                created__lt?: string;
                created__lte?: string;
                created__month?: number;
                created__year?: number;
                expiration__date__gt?: string;
                expiration__date__gte?: string;
                expiration__date__lt?: string;
                expiration__date__lte?: string;
                expiration__day?: number;
                expiration__gt?: string;
                expiration__gte?: string;
                expiration__lt?: string;
                expiration__lte?: string;
                expiration__month?: number;
                expiration__year?: number;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedShareLinkList"];
                };
            };
        };
    };
    share_links_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["ShareLinkRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["ShareLinkRequest"];
                "multipart/form-data": components["schemas"]["ShareLinkRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ShareLink"];
                };
            };
        };
    };
    share_links_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this share link. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ShareLink"];
                };
            };
        };
    };
    share_links_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this share link. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    statistics_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: unknown;
                    };
                };
            };
        };
    };
    status_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SystemStatus"];
                };
            };
        };
    };
    storage_paths_list: {
        parameters: {
            query?: {
                full_perms?: boolean;
                id?: number;
                /** @description Multiple values may be separated by commas. */
                id__in?: number[];
                name__icontains?: string;
                name__iendswith?: string;
                name__iexact?: string;
                name__istartswith?: string;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
                path__icontains?: string;
                path__iendswith?: string;
                path__iexact?: string;
                path__istartswith?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedStoragePathList"];
                };
            };
        };
    };
    storage_paths_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["StoragePathRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["StoragePathRequest"];
                "multipart/form-data": components["schemas"]["StoragePathRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StoragePath"];
                };
            };
        };
    };
    storage_paths_retrieve: {
        parameters: {
            query?: {
                full_perms?: boolean;
            };
            header?: never;
            path: {
                /** @description A unique integer value identifying this storage path. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StoragePath"];
                };
            };
        };
    };
    storage_paths_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this storage path. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["StoragePathRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["StoragePathRequest"];
                "multipart/form-data": components["schemas"]["StoragePathRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StoragePath"];
                };
            };
        };
    };
    storage_paths_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this storage path. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    storage_paths_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this storage path. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedStoragePathRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedStoragePathRequest"];
                "multipart/form-data": components["schemas"]["PatchedStoragePathRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StoragePath"];
                };
            };
        };
    };
    storage_paths_test: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["StoragePathTestRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["StoragePathTestRequest"];
                "multipart/form-data": components["schemas"]["StoragePathTestRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    tags_list: {
        parameters: {
            query?: {
                full_perms?: boolean;
                id?: number;
                /** @description Multiple values may be separated by commas. */
                id__in?: number[];
                /** @description Is root tag */
                is_root?: boolean;
                name__icontains?: string;
                name__iendswith?: string;
                name__iexact?: string;
                name__istartswith?: string;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedTagList"];
                };
            };
        };
    };
    tags_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TagRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["TagRequest"];
                "multipart/form-data": components["schemas"]["TagRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Tag"];
                };
            };
        };
    };
    tags_retrieve: {
        parameters: {
            query?: {
                full_perms?: boolean;
            };
            header?: never;
            path: {
                /** @description A unique integer value identifying this tag. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Tag"];
                };
            };
        };
    };
    tags_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this tag. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TagRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["TagRequest"];
                "multipart/form-data": components["schemas"]["TagRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Tag"];
                };
            };
        };
    };
    tags_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this tag. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    tags_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this tag. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedTagRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedTagRequest"];
                "multipart/form-data": components["schemas"]["PatchedTagRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Tag"];
                };
            };
        };
    };
    tasks_list: {
        parameters: {
            query?: {
                /** @description Acknowledged */
                acknowledged?: boolean;
                /** @description Created After */
                date_created_after?: string;
                /** @description Created Before */
                date_created_before?: string;
                /** @description Is Complete */
                is_complete?: boolean;
                /** @description Name */
                name?: string;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                owner?: number;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
                /** @description Result */
                result?: string;
                /**
                 * @description Status
                 *
                 *     * `pending` - Pending
                 *     * `started` - Started
                 *     * `success` - Success
                 *     * `failure` - Failure
                 *     * `revoked` - Revoked
                 */
                status?: ("failure" | "pending" | "revoked" | "started" | "success")[];
                /** @description Filter tasks by Celery UUID */
                task_id?: string;
                /**
                 * @description Task Type
                 *
                 *     * `consume_file` - Consume File
                 *     * `train_classifier` - Train Classifier
                 *     * `sanity_check` - Sanity Check
                 *     * `index_optimize` - Index Optimize
                 *     * `mail_fetch` - Mail Fetch
                 *     * `llm_index` - LLM Index
                 *     * `empty_trash` - Empty Trash
                 *     * `check_workflows` - Check Workflows
                 *     * `bulk_update` - Bulk Update
                 *     * `reprocess_document` - Reprocess Document
                 *     * `build_share_link` - Build Share Link
                 *     * `bulk_delete` - Bulk Delete
                 *     * `apply_ai_suggestions` - Apply AI Suggestions
                 */
                task_type?: ("apply_ai_suggestions" | "build_share_link" | "bulk_delete" | "bulk_update" | "check_workflows" | "consume_file" | "empty_trash" | "index_optimize" | "llm_index" | "mail_fetch" | "reprocess_document" | "sanity_check" | "train_classifier")[];
                /**
                 * @description Trigger Source
                 *
                 *     * `scheduled` - Scheduled
                 *     * `web_ui` - Web UI
                 *     * `api_upload` - API Upload
                 *     * `folder_consume` - Folder Consume
                 *     * `email_consume` - Email Consume
                 *     * `system` - System
                 *     * `manual` - Manual
                 */
                trigger_source?: ("api_upload" | "email_consume" | "folder_consume" | "manual" | "scheduled" | "system" | "web_ui")[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedTaskSerializerV10List"];
                };
            };
        };
    };
    tasks_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this Task. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaskSerializerV10"];
                };
            };
        };
    };
    acknowledge_tasks: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["AcknowledgeTasksViewRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["AcknowledgeTasksViewRequest"];
                "multipart/form-data": components["schemas"]["AcknowledgeTasksViewRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AcknowledgeTasks"];
                };
            };
        };
    };
    tasks_active_list: {
        parameters: {
            query?: {
                /** @description Acknowledged */
                acknowledged?: boolean;
                /** @description Created After */
                date_created_after?: string;
                /** @description Created Before */
                date_created_before?: string;
                /** @description Is Complete */
                is_complete?: boolean;
                /** @description Name */
                name?: string;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                owner?: number;
                /** @description Result */
                result?: string;
                /**
                 * @description Status
                 *
                 *     * `pending` - Pending
                 *     * `started` - Started
                 *     * `success` - Success
                 *     * `failure` - Failure
                 *     * `revoked` - Revoked
                 */
                status?: ("failure" | "pending" | "revoked" | "started" | "success")[];
                /**
                 * @description Task Type
                 *
                 *     * `consume_file` - Consume File
                 *     * `train_classifier` - Train Classifier
                 *     * `sanity_check` - Sanity Check
                 *     * `index_optimize` - Index Optimize
                 *     * `mail_fetch` - Mail Fetch
                 *     * `llm_index` - LLM Index
                 *     * `empty_trash` - Empty Trash
                 *     * `check_workflows` - Check Workflows
                 *     * `bulk_update` - Bulk Update
                 *     * `reprocess_document` - Reprocess Document
                 *     * `build_share_link` - Build Share Link
                 *     * `bulk_delete` - Bulk Delete
                 *     * `apply_ai_suggestions` - Apply AI Suggestions
                 */
                task_type?: ("apply_ai_suggestions" | "build_share_link" | "bulk_delete" | "bulk_update" | "check_workflows" | "consume_file" | "empty_trash" | "index_optimize" | "llm_index" | "mail_fetch" | "reprocess_document" | "sanity_check" | "train_classifier")[];
                /**
                 * @description Trigger Source
                 *
                 *     * `scheduled` - Scheduled
                 *     * `web_ui` - Web UI
                 *     * `api_upload` - API Upload
                 *     * `folder_consume` - Folder Consume
                 *     * `email_consume` - Email Consume
                 *     * `system` - System
                 *     * `manual` - Manual
                 */
                trigger_source?: ("api_upload" | "email_consume" | "folder_consume" | "manual" | "scheduled" | "system" | "web_ui")[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaskSerializerV10"][];
                };
            };
        };
    };
    run_task: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RunTaskRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["RunTaskRequest"];
                "multipart/form-data": components["schemas"]["RunTaskRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RunTask"];
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RunTaskError"];
                };
            };
        };
    };
    tasks_status_counts_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaskStatusCounts"];
                };
            };
        };
    };
    tasks_summary_list: {
        parameters: {
            query?: {
                /** @description Acknowledged */
                acknowledged?: boolean;
                /** @description Created After */
                date_created_after?: string;
                /** @description Created Before */
                date_created_before?: string;
                /** @description Number of days to include in aggregation (default 30, min 1, max 365) */
                days?: number;
                /** @description Is Complete */
                is_complete?: boolean;
                /** @description Name */
                name?: string;
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                owner?: number;
                /** @description Result */
                result?: string;
                /**
                 * @description Status
                 *
                 *     * `pending` - Pending
                 *     * `started` - Started
                 *     * `success` - Success
                 *     * `failure` - Failure
                 *     * `revoked` - Revoked
                 */
                status?: ("failure" | "pending" | "revoked" | "started" | "success")[];
                /**
                 * @description Task Type
                 *
                 *     * `consume_file` - Consume File
                 *     * `train_classifier` - Train Classifier
                 *     * `sanity_check` - Sanity Check
                 *     * `index_optimize` - Index Optimize
                 *     * `mail_fetch` - Mail Fetch
                 *     * `llm_index` - LLM Index
                 *     * `empty_trash` - Empty Trash
                 *     * `check_workflows` - Check Workflows
                 *     * `bulk_update` - Bulk Update
                 *     * `reprocess_document` - Reprocess Document
                 *     * `build_share_link` - Build Share Link
                 *     * `bulk_delete` - Bulk Delete
                 *     * `apply_ai_suggestions` - Apply AI Suggestions
                 */
                task_type?: ("apply_ai_suggestions" | "build_share_link" | "bulk_delete" | "bulk_update" | "check_workflows" | "consume_file" | "empty_trash" | "index_optimize" | "llm_index" | "mail_fetch" | "reprocess_document" | "sanity_check" | "train_classifier")[];
                /**
                 * @description Trigger Source
                 *
                 *     * `scheduled` - Scheduled
                 *     * `web_ui` - Web UI
                 *     * `api_upload` - API Upload
                 *     * `folder_consume` - Folder Consume
                 *     * `email_consume` - Email Consume
                 *     * `system` - System
                 *     * `manual` - Manual
                 */
                trigger_source?: ("api_upload" | "email_consume" | "folder_consume" | "manual" | "scheduled" | "system" | "web_ui")[];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TaskSummary"][];
                };
            };
        };
    };
    token_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PaperlessAuthTokenRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PaperlessAuthTokenRequest"];
                "multipart/form-data": components["schemas"]["PaperlessAuthTokenRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaperlessAuthToken"];
                };
            };
        };
    };
    trash_list: {
        parameters: {
            query?: {
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    trash_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TrashRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["TrashRequest"];
                "multipart/form-data": components["schemas"]["TrashRequest"];
            };
        };
        responses: {
            /** @description No response body */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    ui_settings_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UiSettingsView"];
                };
            };
        };
    };
    ui_settings_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["UiSettingsViewRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["UiSettingsViewRequest"];
                "multipart/form-data": components["schemas"]["UiSettingsViewRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UiSettingsView"];
                };
            };
        };
    };
    users_list: {
        parameters: {
            query?: {
                /** @description Which field to use when ordering the results. */
                ordering?: string;
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
                username__icontains?: string;
                username__iendswith?: string;
                username__iexact?: string;
                username__istartswith?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedUserList"];
                };
            };
        };
    };
    users_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["UserRequest"];
                "multipart/form-data": components["schemas"]["UserRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
        };
    };
    users_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this user. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
        };
    };
    users_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this user. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["UserRequest"];
                "multipart/form-data": components["schemas"]["UserRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
        };
    };
    users_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this user. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    users_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this user. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedUserRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedUserRequest"];
                "multipart/form-data": components["schemas"]["PatchedUserRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["User"];
                };
            };
        };
    };
    users_deactivate_totp_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this user. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    workflow_actions_list: {
        parameters: {
            query?: {
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedWorkflowActionList"];
                };
            };
        };
    };
    workflow_actions_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["WorkflowActionRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["WorkflowActionRequest"];
                "multipart/form-data": components["schemas"]["WorkflowActionRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WorkflowAction"];
                };
            };
        };
    };
    workflow_actions_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this workflow action. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WorkflowAction"];
                };
            };
        };
    };
    workflow_actions_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this workflow action. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["WorkflowActionRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["WorkflowActionRequest"];
                "multipart/form-data": components["schemas"]["WorkflowActionRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WorkflowAction"];
                };
            };
        };
    };
    workflow_actions_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this workflow action. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    workflow_actions_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this workflow action. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedWorkflowActionRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedWorkflowActionRequest"];
                "multipart/form-data": components["schemas"]["PatchedWorkflowActionRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WorkflowAction"];
                };
            };
        };
    };
    workflow_triggers_list: {
        parameters: {
            query?: {
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedWorkflowTriggerList"];
                };
            };
        };
    };
    workflow_triggers_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["WorkflowTriggerRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["WorkflowTriggerRequest"];
                "multipart/form-data": components["schemas"]["WorkflowTriggerRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WorkflowTrigger"];
                };
            };
        };
    };
    workflow_triggers_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this workflow trigger. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WorkflowTrigger"];
                };
            };
        };
    };
    workflow_triggers_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this workflow trigger. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["WorkflowTriggerRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["WorkflowTriggerRequest"];
                "multipart/form-data": components["schemas"]["WorkflowTriggerRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WorkflowTrigger"];
                };
            };
        };
    };
    workflow_triggers_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this workflow trigger. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    workflow_triggers_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this workflow trigger. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedWorkflowTriggerRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedWorkflowTriggerRequest"];
                "multipart/form-data": components["schemas"]["PatchedWorkflowTriggerRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WorkflowTrigger"];
                };
            };
        };
    };
    workflows_list: {
        parameters: {
            query?: {
                /** @description A page number within the paginated result set. */
                page?: number;
                /** @description Number of results to return per page. */
                page_size?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PaginatedWorkflowList"];
                };
            };
        };
    };
    workflows_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["WorkflowRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["WorkflowRequest"];
                "multipart/form-data": components["schemas"]["WorkflowRequest"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Workflow"];
                };
            };
        };
    };
    workflows_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this workflow. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Workflow"];
                };
            };
        };
    };
    workflows_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this workflow. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["WorkflowRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["WorkflowRequest"];
                "multipart/form-data": components["schemas"]["WorkflowRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Workflow"];
                };
            };
        };
    };
    workflows_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this workflow. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    workflows_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this workflow. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedWorkflowRequest"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedWorkflowRequest"];
                "multipart/form-data": components["schemas"]["PatchedWorkflowRequest"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Workflow"];
                };
            };
        };
    };
}
