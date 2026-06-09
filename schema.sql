-- ============================================================
-- CUREBAY TOTALCARE — SQLITE SCHEMA
-- 37 tables · 3NF · Production-ready
-- ============================================================

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
PRAGMA encoding = 'UTF-8';

-- ─────────────────────────────────────────────
-- 1. products
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
    id              TEXT    NOT NULL,
    name            TEXT    NOT NULL,
    subtitle        TEXT,
    description     TEXT,
    price           INTEGER NOT NULL CHECK(price >= 0),
    original_price  INTEGER NOT NULL CHECK(original_price >= 0),
    discount_pct    INTEGER GENERATED ALWAYS AS (
                        CASE
                            WHEN original_price > 0
                            THEN CAST(ROUND((original_price - price) * 100.0 / original_price) AS INTEGER)
                            ELSE 0
                        END
                    ) VIRTUAL,
    rating          REAL    NOT NULL DEFAULT 0.0 CHECK(rating BETWEEN 0.0 AND 5.0),
    review_count    INTEGER NOT NULL DEFAULT 0 CHECK(review_count >= 0),
    features_title  TEXT,
    product_type    TEXT    NOT NULL CHECK(product_type IN ('individual', 'bundle')),
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    display_order   INTEGER NOT NULL DEFAULT 0,
    created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT    NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS idx_products_type   ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_order  ON products(display_order);

-- ─────────────────────────────────────────────
-- 2. product_features
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_features (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    product_id      TEXT    NOT NULL,
    feature_text    TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_pf_product ON product_features(product_id, display_order);

-- ─────────────────────────────────────────────
-- 3. product_images
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_images (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    product_id      TEXT    NOT NULL,
    image_url       TEXT    NOT NULL,
    alt_text        TEXT,
    is_primary      INTEGER NOT NULL DEFAULT 0 CHECK(is_primary IN (0, 1)),
    display_order   INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_pi_product ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_pi_primary ON product_images(product_id, is_primary);

-- ─────────────────────────────────────────────
-- 4. product_bundle_items
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_bundle_items (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    bundle_id       TEXT    NOT NULL,
    component_id    TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    UNIQUE (bundle_id, component_id),
    CHECK (bundle_id != component_id),
    FOREIGN KEY (bundle_id)    REFERENCES products(id) ON DELETE CASCADE  ON UPDATE CASCADE,
    FOREIGN KEY (component_id) REFERENCES products(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_pbi_bundle    ON product_bundle_items(bundle_id);
CREATE INDEX IF NOT EXISTS idx_pbi_component ON product_bundle_items(component_id);

-- ─────────────────────────────────────────────
-- 5. health_concerns
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS health_concerns (
    id              TEXT    NOT NULL,
    label           TEXT    NOT NULL,
    description     TEXT,
    icon_name       TEXT,
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS idx_hc_active ON health_concerns(is_active, display_order);

-- ─────────────────────────────────────────────
-- 6. concern_recommendations
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS concern_recommendations (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    concern_id      TEXT    NOT NULL,
    product_id      TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    UNIQUE (concern_id, product_id),
    FOREIGN KEY (concern_id) REFERENCES health_concerns(id) ON DELETE CASCADE  ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)        ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cr_concern ON concern_recommendations(concern_id);
CREATE INDEX IF NOT EXISTS idx_cr_product ON concern_recommendations(product_id);

-- ─────────────────────────────────────────────
-- 7. concern_description_parts
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS concern_description_parts (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    concern_id      TEXT    NOT NULL,
    part_text       TEXT    NOT NULL,
    is_highlighted  INTEGER NOT NULL DEFAULT 0 CHECK(is_highlighted IN (0, 1)),
    display_order   INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (concern_id) REFERENCES health_concerns(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cdp_concern ON concern_description_parts(concern_id, display_order);

-- ─────────────────────────────────────────────
-- 8. subscription_plans
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscription_plans (
    id                  TEXT    NOT NULL,
    title               TEXT    NOT NULL,
    plan_type           TEXT    NOT NULL CHECK(plan_type IN ('monthly', 'quarterly', 'yearly')),
    original_price      INTEGER NOT NULL CHECK(original_price >= 0),
    discounted_price    INTEGER NOT NULL CHECK(discounted_price >= 0),
    price_period        TEXT    NOT NULL CHECK(price_period IN ('month', 'year')),
    currency            TEXT    NOT NULL DEFAULT 'INR',
    subtitle            TEXT,
    title_color         TEXT,
    cta_text            TEXT,
    is_active           INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    is_featured         INTEGER NOT NULL DEFAULT 0 CHECK(is_featured IN (0, 1)),
    display_order       INTEGER NOT NULL DEFAULT 0,
    created_at          TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at          TEXT    NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS idx_sp_active ON subscription_plans(is_active, display_order);

-- ─────────────────────────────────────────────
-- 9. subscription_description_lines
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscription_description_lines (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    plan_id         TEXT    NOT NULL,
    line_text       TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sdl_plan ON subscription_description_lines(plan_id, display_order);

-- ─────────────────────────────────────────────
-- 10. subscription_features
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscription_features (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    feature_text    TEXT    NOT NULL,
    icon_name       TEXT,
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1))
);

CREATE INDEX IF NOT EXISTS idx_sf_active ON subscription_features(is_active, display_order);

-- ─────────────────────────────────────────────
-- 11. subscription_plan_features  (M:N junction)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscription_plan_features (
    plan_id         TEXT    NOT NULL,
    feature_id      INTEGER NOT NULL,
    PRIMARY KEY (plan_id, feature_id),
    FOREIGN KEY (plan_id)    REFERENCES subscription_plans(id)    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (feature_id) REFERENCES subscription_features(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_spf_feature ON subscription_plan_features(feature_id);

-- ─────────────────────────────────────────────
-- 12. subscription_price_breakdowns
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscription_price_breakdowns (
    id                  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    plan_id             TEXT    NOT NULL,
    label               TEXT    NOT NULL,
    original_display    TEXT,
    discounted_display  TEXT,
    display_order       INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_spb_plan ON subscription_price_breakdowns(plan_id, display_order);

-- ─────────────────────────────────────────────
-- 13. subscription_savings
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscription_savings (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    plan_id         TEXT    NOT NULL,
    label           TEXT    NOT NULL,
    value_text      TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_ss_plan ON subscription_savings(plan_id, display_order);

-- ─────────────────────────────────────────────
-- 14. subscription_billing_info
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscription_billing_info (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    plan_id         TEXT    NOT NULL,
    info_text       TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sbi_plan ON subscription_billing_info(plan_id, display_order);

-- ─────────────────────────────────────────────
-- 15. care_services
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS care_services (
    id                      TEXT    NOT NULL,
    label                   TEXT    NOT NULL,
    headline                TEXT    NOT NULL,
    accent_text             TEXT,
    icon_name               TEXT,
    expanded_panel_top      INTEGER,
    expanded_bullets_top    INTEGER,
    display_order           INTEGER NOT NULL DEFAULT 0,
    is_active               INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS idx_cs_active ON care_services(is_active, display_order);

-- ─────────────────────────────────────────────
-- 16. service_features
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS service_features (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    service_id      TEXT    NOT NULL,
    feature_text    TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (service_id) REFERENCES care_services(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_svf_service ON service_features(service_id, display_order);

-- ─────────────────────────────────────────────
-- 17. testimonials
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    person_name     TEXT    NOT NULL,
    badge_text      TEXT,
    quote           TEXT    NOT NULL,
    photo_url       TEXT,
    service_id      TEXT,
    product_id      TEXT,
    context         TEXT    NOT NULL DEFAULT 'general'
                            CHECK(context IN ('service', 'product', 'general')),
    is_featured     INTEGER NOT NULL DEFAULT 0 CHECK(is_featured IN (0, 1)),
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (service_id) REFERENCES care_services(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)       ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_t_service  ON testimonials(service_id, display_order);
CREATE INDEX IF NOT EXISTS idx_t_product  ON testimonials(product_id, display_order);
CREATE INDEX IF NOT EXISTS idx_t_featured ON testimonials(is_featured, is_active);

-- ─────────────────────────────────────────────
-- 18. faq_categories
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faq_categories (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name            TEXT    NOT NULL,
    slug            TEXT    NOT NULL UNIQUE,
    display_order   INTEGER NOT NULL DEFAULT 0
);

-- ─────────────────────────────────────────────
-- 19. faqs
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    question        TEXT    NOT NULL,
    answer_type     TEXT    NOT NULL CHECK(answer_type IN ('text', 'list', 'steps')),
    answer_text     TEXT,
    category_id     INTEGER,
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (category_id) REFERENCES faq_categories(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_faq_category ON faqs(category_id, display_order);
CREATE INDEX IF NOT EXISTS idx_faq_active   ON faqs(is_active, display_order);

-- ─────────────────────────────────────────────
-- 20. faq_list_items
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faq_list_items (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    faq_id          INTEGER NOT NULL,
    item_text       TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (faq_id) REFERENCES faqs(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_fli_faq ON faq_list_items(faq_id, display_order);

-- ─────────────────────────────────────────────
-- 21. faq_steps
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faq_steps (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    faq_id          INTEGER NOT NULL,
    step_title      TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (faq_id) REFERENCES faqs(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_fs_faq ON faq_steps(faq_id, display_order);

-- ─────────────────────────────────────────────
-- 22. faq_step_items
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faq_step_items (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    step_id         INTEGER NOT NULL,
    item_text       TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (step_id) REFERENCES faq_steps(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_fsi_step ON faq_step_items(step_id, display_order);

-- ─────────────────────────────────────────────
-- 23. highlight_cards
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS highlight_cards (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    label           TEXT    NOT NULL,
    service_id      TEXT,
    overlay_type    TEXT    CHECK(overlay_type IN
                        ('records', 'vitals', 'emergency',
                         'nutrition', 'exercise', 'lab')),
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    FOREIGN KEY (service_id) REFERENCES care_services(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_hcard_active ON highlight_cards(is_active, display_order);

-- ─────────────────────────────────────────────
-- 24. health360_frames
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS health360_frames (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title_lines     TEXT    NOT NULL,
    body_text       TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1))
);

CREATE INDEX IF NOT EXISTS idx_h360_active ON health360_frames(is_active, display_order);

-- ─────────────────────────────────────────────
-- 25. health360_frame_bullets
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS health360_frame_bullets (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    frame_id        INTEGER NOT NULL,
    bullet_text     TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (frame_id) REFERENCES health360_frames(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_h360b_frame ON health360_frame_bullets(frame_id, display_order);

-- ─────────────────────────────────────────────
-- 26. product_detail_tabs
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_detail_tabs (
    id                      TEXT    NOT NULL,
    product_id              TEXT    NOT NULL,
    tab_label               TEXT    NOT NULL,
    vitals_layout           TEXT    NOT NULL DEFAULT 'list'
                                    CHECK(vitals_layout IN ('grid', 'list')),
    latest_reading_label    TEXT,
    display_order           INTEGER NOT NULL DEFAULT 0,
    is_active               INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_pdt_product ON product_detail_tabs(product_id, display_order);

-- ─────────────────────────────────────────────
-- 27. product_detail_vitals
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_detail_vitals (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    tab_id          TEXT    NOT NULL,
    icon_name       TEXT,
    label           TEXT    NOT NULL,
    value           TEXT    NOT NULL,
    unit            TEXT,
    value2          TEXT,
    unit2           TEXT,
    display_order   INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (tab_id) REFERENCES product_detail_tabs(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_pdv_tab ON product_detail_vitals(tab_id, display_order);

-- ─────────────────────────────────────────────
-- 28. product_detail_insights
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_detail_insights (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    tab_id          TEXT    NOT NULL UNIQUE,
    icon_name       TEXT,
    label           TEXT    NOT NULL,
    insight_type    TEXT    NOT NULL CHECK(insight_type IN ('paragraph', 'metric')),
    insight_text    TEXT,
    highlight_value TEXT,
    FOREIGN KEY (tab_id) REFERENCES product_detail_tabs(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ─────────────────────────────────────────────
-- 29. product_showcase_bullets
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_showcase_bullets (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    bullet_text     TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1))
);

-- ─────────────────────────────────────────────
-- 30. footer_sections
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS footer_sections (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    heading         TEXT    NOT NULL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1))
);

-- ─────────────────────────────────────────────
-- 31. footer_links
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS footer_links (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    section_id      INTEGER NOT NULL,
    label           TEXT    NOT NULL,
    url             TEXT    NOT NULL,
    opens_new_tab   INTEGER NOT NULL DEFAULT 0 CHECK(opens_new_tab IN (0, 1)),
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    FOREIGN KEY (section_id) REFERENCES footer_sections(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_fl_section ON footer_links(section_id, display_order);

-- ─────────────────────────────────────────────
-- 32. nav_items  (self-referencing tree)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS nav_items (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    label           TEXT    NOT NULL,
    url             TEXT,
    parent_id       INTEGER,
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    FOREIGN KEY (parent_id) REFERENCES nav_items(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_nav_parent ON nav_items(parent_id, display_order);
CREATE INDEX IF NOT EXISTS idx_nav_active  ON nav_items(is_active, display_order);

-- ─────────────────────────────────────────────
-- 33. site_config
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_config (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    config_key      TEXT    NOT NULL UNIQUE,
    config_value    TEXT    NOT NULL,
    config_group    TEXT    NOT NULL DEFAULT 'general',
    updated_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_cfg_group ON site_config(config_group);

-- ─────────────────────────────────────────────
-- 34. users
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    full_name       TEXT    NOT NULL,
    email           TEXT    UNIQUE,
    phone           TEXT,
    password_hash   TEXT,
    role            TEXT    NOT NULL DEFAULT 'customer'
                            CHECK(role IN ('customer', 'admin', 'doctor')),
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL;
CREATE INDEX       IF NOT EXISTS idx_users_role  ON users(role, is_active);

-- ─────────────────────────────────────────────
-- 35. user_subscriptions
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER NOT NULL,
    plan_id         TEXT    NOT NULL,
    status          TEXT    NOT NULL DEFAULT 'active'
                            CHECK(status IN ('active', 'paused', 'cancelled', 'expired')),
    starts_at       TEXT    NOT NULL,
    ends_at         TEXT,
    auto_renew      INTEGER NOT NULL DEFAULT 1 CHECK(auto_renew IN (0, 1)),
    created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)              ON DELETE CASCADE  ON UPDATE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_usub_user   ON user_subscriptions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_usub_plan   ON user_subscriptions(plan_id);
CREATE INDEX IF NOT EXISTS idx_usub_status ON user_subscriptions(status, ends_at);

-- ─────────────────────────────────────────────
-- 36. orders
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
    id                  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id             INTEGER,
    order_number        TEXT    NOT NULL UNIQUE,
    status              TEXT    NOT NULL DEFAULT 'pending'
                                CHECK(status IN (
                                    'pending', 'confirmed', 'shipped',
                                    'delivered', 'cancelled', 'refunded'
                                )),
    subtotal            INTEGER NOT NULL CHECK(subtotal >= 0),
    discount            INTEGER NOT NULL DEFAULT 0 CHECK(discount >= 0),
    total_amount        INTEGER NOT NULL CHECK(total_amount >= 0),
    currency            TEXT    NOT NULL DEFAULT 'INR',
    shipping_address    TEXT,
    created_at          TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at          TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_orders_user   ON orders(user_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status, created_at);

-- ─────────────────────────────────────────────
-- 37. order_items
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    order_id        INTEGER NOT NULL,
    product_id      TEXT,
    plan_id         TEXT,
    item_type       TEXT    NOT NULL CHECK(item_type IN ('product', 'subscription')),
    quantity        INTEGER NOT NULL DEFAULT 1 CHECK(quantity > 0),
    unit_price      INTEGER NOT NULL CHECK(unit_price >= 0),
    total_price     INTEGER NOT NULL GENERATED ALWAYS AS (quantity * unit_price) VIRTUAL,
    CONSTRAINT exactly_one_ref CHECK (
        (item_type = 'product'      AND product_id IS NOT NULL AND plan_id IS NULL) OR
        (item_type = 'subscription' AND plan_id IS NOT NULL    AND product_id IS NULL)
    ),
    FOREIGN KEY (order_id)   REFERENCES orders(id)             ON DELETE CASCADE  ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)           ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (plan_id)    REFERENCES subscription_plans(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_oi_order   ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_oi_product ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_oi_plan    ON order_items(plan_id);

-- ─────────────────────────────────────────────
-- 38. status_cards
--     Defines every status-card tile that can appear
--     on a user dashboard (health metric, service,
--     device, or subscription status).
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS status_cards (
    id              TEXT    NOT NULL,
    title           TEXT    NOT NULL,
    description     TEXT,
    icon_name       TEXT,
    card_type       TEXT    NOT NULL
                            CHECK(card_type IN (
                                'health', 'device', 'service', 'subscription', 'payment'
                            )),
    linked_product_id   TEXT,
    linked_service_id   TEXT,
    unit            TEXT,
    display_order   INTEGER NOT NULL DEFAULT 0,
    is_active       INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT    NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (id),
    FOREIGN KEY (linked_product_id) REFERENCES products(id)       ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (linked_service_id) REFERENCES care_services(id)  ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sc_type   ON status_cards(card_type, is_active);
CREATE INDEX IF NOT EXISTS idx_sc_order  ON status_cards(display_order);
CREATE INDEX IF NOT EXISTS idx_sc_prod   ON status_cards(linked_product_id);
CREATE INDEX IF NOT EXISTS idx_sc_svc    ON status_cards(linked_service_id);

-- ─────────────────────────────────────────────
-- 39. status_card_levels
--     Each card can have multiple named levels
--     (normal / warning / critical / pending …)
--     each with its own label, colours, and copy.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS status_card_levels (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    card_id         TEXT    NOT NULL,
    level_key       TEXT    NOT NULL
                            CHECK(level_key IN (
                                'normal', 'warning', 'critical',
                                'pending', 'inactive', 'elevated',
                                'processing', 'refunded', 'cancelled', 'timeout'
                            )),
    label           TEXT    NOT NULL,
    description     TEXT,
    color_hex       TEXT    NOT NULL DEFAULT '#000000',
    bg_color_hex    TEXT    NOT NULL DEFAULT '#FFFFFF',
    icon_name       TEXT,
    display_order   INTEGER NOT NULL DEFAULT 0,
    UNIQUE (card_id, level_key),
    FOREIGN KEY (card_id) REFERENCES status_cards(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_scl_card  ON status_card_levels(card_id, display_order);
CREATE INDEX IF NOT EXISTS idx_scl_level ON status_card_levels(level_key);

-- ─────────────────────────────────────────────
-- 40. status_card_metrics
--     Numeric metrics tracked by each card,
--     with threshold ranges that map to a level.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS status_card_metrics (
    id              INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    card_id         TEXT    NOT NULL,
    metric_key      TEXT    NOT NULL,
    metric_label    TEXT    NOT NULL,
    metric_unit     TEXT,
    normal_min      REAL,
    normal_max      REAL,
    warning_min     REAL,
    warning_max     REAL,
    critical_min    REAL,
    critical_max    REAL,
    display_order   INTEGER NOT NULL DEFAULT 0,
    UNIQUE (card_id, metric_key),
    FOREIGN KEY (card_id) REFERENCES status_cards(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_scm_card ON status_card_metrics(card_id, display_order);

-- ============================================================
-- TRIGGERS
-- ============================================================

CREATE TRIGGER IF NOT EXISTS trg_status_cards_updated
    AFTER UPDATE ON status_cards
    BEGIN UPDATE status_cards SET updated_at = datetime('now') WHERE id = NEW.id; END;

-- ─────────────────────────────────────────────
-- 41. payments
--     Records every payment attempt against an order.
--     One order can have multiple attempts (retries).
--     Mirrors the 7 modes in PaymentPage.jsx and the
--     7 payment status levels in status_card_levels.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
    id                  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    order_id            INTEGER NOT NULL,
    payment_method      TEXT    NOT NULL
                                CHECK(payment_method IN (
                                    'all', 'debit', 'credit',
                                    'upi', 'wallet', 'netbanking', 'cod'
                                )),
    transaction_id      TEXT    UNIQUE,
    gateway_ref         TEXT,
    amount              INTEGER NOT NULL CHECK(amount >= 0),
    currency            TEXT    NOT NULL DEFAULT 'INR',
    status              TEXT    NOT NULL DEFAULT 'pending'
                                CHECK(status IN (
                                    'pending', 'processing', 'successful',
                                    'failed', 'refunded', 'cancelled', 'timeout'
                                )),
    failure_reason      TEXT,
    initiated_at        TEXT    NOT NULL DEFAULT (datetime('now')),
    completed_at        TEXT,
    created_at          TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at          TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_pay_order    ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_pay_status   ON payments(status, initiated_at);
CREATE INDEX IF NOT EXISTS idx_pay_txn      ON payments(transaction_id) WHERE transaction_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_pay_method   ON payments(payment_method, status);

CREATE TRIGGER IF NOT EXISTS trg_payments_updated
    AFTER UPDATE ON payments
    BEGIN UPDATE payments SET updated_at = datetime('now') WHERE id = NEW.id; END;

CREATE TRIGGER IF NOT EXISTS trg_products_updated
    AFTER UPDATE ON products
    BEGIN UPDATE products SET updated_at = datetime('now') WHERE id = NEW.id; END;

CREATE TRIGGER IF NOT EXISTS trg_subscription_plans_updated
    AFTER UPDATE ON subscription_plans
    BEGIN UPDATE subscription_plans SET updated_at = datetime('now') WHERE id = NEW.id; END;

CREATE TRIGGER IF NOT EXISTS trg_faqs_updated
    AFTER UPDATE ON faqs
    BEGIN UPDATE faqs SET updated_at = datetime('now') WHERE id = NEW.id; END;

CREATE TRIGGER IF NOT EXISTS trg_users_updated
    AFTER UPDATE ON users
    BEGIN UPDATE users SET updated_at = datetime('now') WHERE id = NEW.id; END;

CREATE TRIGGER IF NOT EXISTS trg_user_subscriptions_updated
    AFTER UPDATE ON user_subscriptions
    BEGIN UPDATE user_subscriptions SET updated_at = datetime('now') WHERE id = NEW.id; END;

CREATE TRIGGER IF NOT EXISTS trg_orders_updated
    AFTER UPDATE ON orders
    BEGIN UPDATE orders SET updated_at = datetime('now') WHERE id = NEW.id; END;

CREATE TRIGGER IF NOT EXISTS trg_site_config_updated
    AFTER UPDATE ON site_config
    BEGIN UPDATE site_config SET updated_at = datetime('now') WHERE id = NEW.id; END;
