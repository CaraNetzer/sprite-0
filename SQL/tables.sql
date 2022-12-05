USE [SpriteZero]
GO

CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Username] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Image] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Src] nvarchar(255) NOT NULL,
  [Price] float,
  [Height] int NOT NULL,
  [Width] int NOT NULL,
  [Notes] nvarchar(255),
  [Title] nvarchar(255) NOT NULL,
  [Sheet] bit,
  [Upvotes] int,
  [Downvotes] int,
  [Artist] nvarchar(255),
  [UserId] int NOT NULL
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ImageTag] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [TagId] int NOT NULL,
  [ImageId] int NOT NULL
)
GO

CREATE TABLE [Folder] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ImageFolder] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [ImageId] int NOT NULL,
  [FolderId] int NOT NULL,
  [UserId] int NOT NULL
)
GO

ALTER TABLE [Image] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO			 
			 
ALTER TABLE [ImageFolder] ADD FOREIGN KEY ([FolderId]) REFERENCES [Folder] ([Id])
GO			 
			 
ALTER TABLE [ImageTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id])
GO			 
			 
ALTER TABLE [ImageTag] ADD FOREIGN KEY ([ImageId]) REFERENCES [Image] ([Id])
GO			 
			 
ALTER TABLE [ImageFolder] ADD FOREIGN KEY ([ImageId]) REFERENCES [Image] ([Id])
GO			 
			 
ALTER TABLE [ImageFolder] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO
