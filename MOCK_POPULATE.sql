-- Helados
INSERT INTO IceCreamCatalog (flavor, image)
VALUES ('Vainilla', 'https://images.pexels.com/photos/1739347/pexels-photo-1739347.jpeg?auto=compress&cs=tinysrgb&w=280&h=750&dpr=1');

INSERT INTO IceCreamCatalog (flavor, image)
VALUES ('Chocolate', 'https://images.pexels.com/photos/3625371/pexels-photo-3625371.jpeg?auto=compress&cs=tinysrgb&w=380&h=750&dpr=1');

INSERT INTO IceCreamCatalog (flavor, image)
VALUES ('Fresa', 'https://images.pexels.com/photos/5060943/pexels-photo-5060943.jpeg?auto=compress&cs=tinysrgb&w=380&h=750&dpr=1');

INSERT INTO IceCreamCatalog (flavor, image)
VALUES ('Mango', 'https://images.pexels.com/photos/5060377/pexels-photo-5060377.jpeg?auto=compress&cs=tinysrgb&w=380&h=750&dpr=1');

INSERT INTO IceCreamCatalog (flavor, image)
VALUES ('Limón', 'https://images.pexels.com/photos/15284444/pexels-photo-15284444.jpeg?auto=compress&cs=tinysrgb&w=580&h=750&dpr=1');

INSERT INTO IceCreamCatalog (flavor, image)
VALUES ('Naranja', 'https://imag.bonviveur.com/helado-de-naranja.webp');

INSERT INTO IceCreamCatalog (flavor, image)
VALUES ('Oreo', 'https://homebodyeats.com/wp-content/uploads/2022/08/oreo-cookie-ice-cream-recipe.jpg');

INSERT INTO IceCreamCatalog (flavor, image)
VALUES ('Café', 'https://cdn7.kiwilimon.com/recetaimagen/37043/640x426/46487.jpg.webp');

INSERT INTO IceCreamCatalog (flavor, image)
VALUES ('Chicle', 'https://www.eis-perfecto.de/wp-content/uploads/2021/01/bubbel-gum-eis-848x477.jpg');

INSERT INTO IceCreamCatalog (flavor, image)
VALUES ('Queso con zarzamora', 'https://www.cardamomo.news/__export/1620266500688/sites/debate/img/2021/05/05/helado_de_queso_con_zarzamorax_receta_casera_fxcil_sin_heladera_crop1620266080975.jpeg_172596871.jpeg');

-- Productos

INSERT INTO Category (name) VALUES
  ('entradas'),
  ('plato fuerte'),
  ('bebidas'),
  ('postre');
  
INSERT INTO "Product" ("name", "description", "image", "price", "categoryId") VALUES
  ('Guacamole', 'Deliciosa salsa de aguacate con tomate, cebolla y cilantro', 'https://assets.unileversolutions.com/recipes-v2/93272.jpg', '60.00', 1),
  ('Quesadillas', 'Tortillas de maíz rellenas de queso y acompañadas de salsa', 'https://assets.unileversolutions.com/recipes-v2/37818.jpg', '70.00', 1),
  ('Tostadas de tinga', 'Tostadas de maíz con pollo deshebrado en salsa de tomate y chipotle', 'https://www.mylatinatable.com/wp-content/uploads/2018/09/foto-h-500x375.jpg', '65.00', 1),
  ('Chiles rellenos', 'Chiles poblanos rellenos de queso y capeados, bañados en salsa de tomate', 'https://assets.unileversolutions.com/recipes-v2/109069.jpg', '90.00', 1),
  ('Elote asado', 'Elote asado con mayonesa, queso rallado y chile en polvo', 'https://images-gmi-pmc.edge-generalmills.com/08176917-2fa9-4039-8e17-860e15bde5e7.jpg', '35.00', 1),
  ('Nachos', 'Nachos con carne, frijoles, queso, guacamole y salsa', 'https://cdn7.kiwilimon.com/recetaimagen/959/22479.jpg', '80.00', 1);
  
INSERT INTO "Product" ("name", "description", "image", "price", "categoryId") VALUES
  ('Enchiladas Verdes', 'Tortillas de maíz rellenas de pollo bañadas en salsa verde con crema y queso rallado', 'https://www.recetasnestle.com.mx/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/c1a47a2e6bd19313b88b7946867a4059.jpg?itok=GJNqhov5', '120', 2),
  ('Chiles Rellenos', 'Chiles poblanos rellenos de queso bañados en salsa de tomate con elote y crema', 'https://assets.unileversolutions.com/recipes-v2/109069.jpg', '130', 2),
  ('Pescado a la Veracruzana', 'Filete de pescado con salsa de tomate, aceitunas, alcaparras y chiles guajillo', 'https://cdn7.kiwilimon.com/recetaimagen/22791/14753.jpg', '180', 2),
  ('Mole Poblano', 'Pollo en salsa de mole poblano con ajonjolí y arroz', 'https://laroussecocina.mx/wp-content/uploads/2017/12/mole-poblano-001-larousse-cocina_0-e1671586546996.jpg', '160', 2),
  ('Chilaquiles', 'Tortilla chips bañadas en salsa roja o verde con queso fresco y crema', 'https://assets.unileversolutions.com/recipes-v2/206095.png', '90', 2),
  ('Pozole', 'Caldo de maíz con carne de cerdo, chile y especias', 'https://assets.unileversolutions.com/recipes-v2/109135.jpg', '130', 2);

INSERT INTO "Product" ("name", "description", "image", "price", "categoryId", "active") VALUES 
  ('Agua fresca de horchata', 'Bebida típica mexicana hecha con arroz y canela', 'https://www.recetasnestle.com.mx/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/1c06b340734ce162966b6e4847497f52.jpeg?itok=U9xQDeRi', '25', 3, 1),
  ('Agua fresca de jamaica', 'Bebida de flores de jamaica dulce y refrescante', 'https://cdn7.kiwilimon.com/recetaimagen/3630/15252.jpg', '25', 3, 1),
  ('Margarita clásica', 'Bebida alcohólica hecha con tequila, jugo de lima y Cointreau', 'https://static.onecms.io/wp-content/uploads/sites/21/2017/06/27/margarita-clasica-2000.jpg', '80', 3, 1),
  ('Michelada', 'Bebida alcohólica y picante hecha con cerveza y jugo de limón', 'https://www.comedera.com/wp-content/uploads/2022/06/Michelada-shutterstock_2062830746.jpg', '60', 3, 1),
  ('Tequila sunrise', 'Bebida alcohólica hecha con tequila, jugo de naranja y granadina', 'https://www.recetasderechupete.com/wp-content/uploads/2022/11/Tequila-Sunrise.jpg', '75', 3, 1),
  ('Piña colada', 'Bebida alcohólica cremosa hecha con ron, crema de coco y jugo de piña', 'https://www.recetasnestle.com.mx/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/5a06c9f3b2dcf287a154fab9a64de6a8.jpg?itok=dzRJH05K', '80', 3, 1);
  
INSERT INTO "Product" ("name", "description", "image", "price", "categoryId") VALUES
  ('Flan', 'Postre lácteo con caramelo líquido', 'https://www.recetasnestle.com.mx/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/54c6cbcbc6d611e056122d64560cd9c1.jpg?itok=Ekj0Kgv-', '25.00', 4),
  ('Pastel de Tres Leches', 'Pastel esponjoso empapado en leche condensada, evaporada y crema', 'https://i.ytimg.com/vi/n0ymEFZJBho/maxresdefault.jpg', '30.00', 4),
  ('Churros con chocolate', 'Churros fritos crujientes con salsa de chocolate caliente', 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2020/11/salsa-de-chocolate-para-churros-receta-casera.jpg', '20.00', 4),
  ('Arroz con leche', 'Postre cremoso de arroz con leche, canela y pasas', 'https://images.aws.nestle.recipes/original/92cd34cb06980d6b4096cb73e5cab8fa_arroz-con-leche.jpeg', '25.00', 4),
  ('Mangonada', 'Bebida refrescante hecha con mango, jugo de limón, chile y sal', 'https://www.recetasnestle.com.mx/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/16d9bbe7fb3c2df4183200676d6bbdf4.jpg?itok=pBhDI_rd', '25.00', 4),
  ('Pay de limón', 'Pastel cremoso de limón con costra de galleta', 'https://editorialtelevisa.brightspotcdn.com/dims4/default/2c651dd/2147483647/strip/true/crop/672x672+264+0/resize/1000x1000!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.amazonaws.com%2Fbrightspot%2Fwp-content%2Fuploads%2F2019%2F07%2Fcomo-hacer-pay-de-limon-1.jpg', '30.00', 4);

-- Usuarios

INSERT INTO
    user(id, username, passwordHash, role)
VALUES
    (
        0,
        'test_admin',
        '$2a$16$aGlV3ag2gTCR1mNeyJ.3pue5yQKLQevPDR1QGrMfburaU62jORlze',        -- pw: test
        'admin'
    ),
    (
        1,
        'test_tablet',
        '$2a$16$aGlV3ag2gTCR1mNeyJ.3pue5yQKLQevPDR1QGrMfburaU62jORlze',        -- pw: test
        'tablet_master'
    );