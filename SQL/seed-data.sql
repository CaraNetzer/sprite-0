SET IDENTITY_INSERT [User] ON
INSERT INTO [User]
  ([Id], [Username], [Email])
VALUES 
  (1, 'oiverhardy', 'olie@email.com'),
  (2, 'spriter123', 'spriter123@email.com'),
  (3, 'stanlaurel', 'stan@email.com');
SET IDENTITY_INSERT [User] OFF

select * from [user];

SET IDENTITY_INSERT [Image] ON
INSERT INTO [Image]
  ([Id], [Src], [Price], [Height], [Width], [Notes], [Title], [Sheet], [Upvotes], [Downvotes], [Artist], [UserId])
VALUES
  (1, 'https://res.cloudinary.com/dkndgz1ge/image/upload/v1670252721/fireballs_s7xtcx.png', null, 64, 96, 'Tile size: 16', 'Fireballs', 1, null, null, null, 2),
  (2, 'https://res.cloudinary.com/dkndgz1ge/image/upload/v1670252917/backgrounds_boh0dh.png', null, 256, 384, null, 'Mario Backgrounds', 1, null, null, null, 2),
  (3, 'https://res.cloudinary.com/dkndgz1ge/image/upload/v1670253031/full_sheet_fn7oxv.png', null, 1024, 1728, null, 'Mario Fullsheet', 1, null, null, null, 2),
  (4, 'https://res.cloudinary.com/dkndgz1ge/image/upload/v1670253132/background_z97hvt.png', null, 1280, 720, null, 'Menu Background', 2, null, null, null, 2),
  (5, 'https://res.cloudinary.com/dkndgz1ge/image/upload/v1670253722/scott_pilgrim_-_raxzilla_z85vns.png', null, 1590, 847, 'Ripped from Scott Pilgrim vs. the World: The Game', 'Scott Pilgrim - Raxzilla', 1, null, null, 'Scott Pilgrim vs. the World: The Game', 2);
SET IDENTITY_INSERT [Image] OFF

select * from imagetag


SET IDENTITY_INSERT [Tag] ON
INSERT INTO [Tag]
  ([Id], [Name])
VALUES
  (1, 'Entity'),
  (2, 'Object'),
  (3, 'Character'),
  (4, 'Background'),
  (5, 'UI'),
  (6, 'Animation'),
  (7, 'Sprite Sheet'),
  (8, 'Ripped'),
  (9, 'Original Art');
SET IDENTITY_INSERT [Tag] OFF


SET IDENTITY_INSERT [ImageTag] ON
INSERT INTO [ImageTag]
	([Id], [TagId], [ImageId])
VALUES
	(1, 5, 4),
	(2, 4, 4),
	(3, 3, 5),
	(4, 1, 5),
	(5, 2, 1),
	(6, 6, 5),
	(7, 8, 5)
SET IDENTITY_INSERT [ImageTag] OFF
