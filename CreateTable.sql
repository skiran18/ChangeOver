CREATE TABLE [Image] (
  [ImgId] varchar(50),
  [ImgLink] varchar(MAX),
  [BackupIL] varchar(MAX),
  PRIMARY KEY ([ImgId])
);

CREATE TABLE [ApparelExpert] (
  [ApparelExpertID] varchar(50),
  [ExpertName] varchar(50),
  [Age] int,
  [PhoneNumber] text,
  [EmailID] varchar(50),
  PRIMARY KEY ([ApparelExpertID])
);


CREATE TABLE [Inspection] (
  [InspectionID] varchar(50),
  [InspectionDate] date,
  [Rating] float,
  [Comments] varchar(MAX),
  [ApparelExpertID] varchar(50),
  PRIMARY KEY ([InspectionID]),
  CONSTRAINT [FK_Inspection.ApparelExpertID]
    FOREIGN KEY ([ApparelExpertID])
      REFERENCES [ApparelExpert]([ApparelExpertID])
);

CREATE TABLE [Product] (
  [ProductId] uniqueidentifier,
  [ImgId] varchar(50),
  [InspectionID] varchar(50),
  [ProductName] varchar(50),
  [Price] float,
  [Description] varchar(MAX),
  [EntryDate] date,
  [Age] varchar(50),
  [Discount] int,
  [Category] varchar(50),
  [Size] varchar(10),
  PRIMARY KEY ([ProductId]),
  CONSTRAINT [FK_Product.ImgId]
    FOREIGN KEY ([ImgId])
      REFERENCES [Image]([ImgId]),
  CONSTRAINT [FK_Product.InspectionID]
    FOREIGN KEY ([InspectionID])
      REFERENCES [Inspection]([InspectionID])
);


CREATE TABLE [Customer] (
  [CustomerID] varchar(50),
  [CustomerName] varchar(50),
  [Phone Number] varchar(20),
  [Email ID] varchar(50),
  [Address] varchar(MAX),
  PRIMARY KEY ([CustomerID])
);


CREATE TABLE [InspectionOrder] (
  [InspectionOrderID] varchar(50),
  [ApparelExpertID] varchar(50),
  [InspectionStatus] varchar(10),
  PRIMARY KEY ([InspectionOrderID]),
  CONSTRAINT [FK_InspectionOrder.ApparelExpertID]
    FOREIGN KEY ([ApparelExpertID])
      REFERENCES [ApparelExpert]([ApparelExpertID])
);


CREATE TABLE [SellOrder] (
  [OrderId] varchar(50),
  [ProductName] varchar(50),
  [Size] varchar(10),
  [Category] varchar(50),
  [PriceNegotiable] varchar(10),
  [Age] varchar(50),
  [PriceQuoted] int,
  [InspectionOrderID] varchar(50),
  PRIMARY KEY ([OrderId]),
  CONSTRAINT [FK_SellOrder.InspectionOrderID]
    FOREIGN KEY ([InspectionOrderID])
      REFERENCES [InspectionOrder]([InspectionOrderID])
);

CREATE TABLE [ProductOrder] (
  [OrderType] varchar(50),
  [OrderID] varchar(50),
  [CustomerID] varchar(50),
  CONSTRAINT [FK_Order.CustomerID]
    FOREIGN KEY ([CustomerID])
      REFERENCES [Customer]([CustomerID])
);