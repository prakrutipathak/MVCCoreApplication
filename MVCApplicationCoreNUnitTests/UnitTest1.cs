using Microsoft.AspNetCore.Mvc;
using Moq;
using MVCApplicationCore.Controllers;
using MVCApplicationCore.Models;
using MVCApplicationCore.Services.Contract;

namespace MVCApplicationCoreNUnitTests
{
    public class Tests
    {
        Mock<ICategoryService> _categoryServiceMock;
        [SetUp]
        public void Setup()
        {
            _categoryServiceMock = new Mock<ICategoryService>();
        }

        [Test]
        public void Index1_ReturnsViewWithCategories_WhenCategoriesExists()
        {
            //Assert.Pass();
            // Arrange
            var categories = new List<Category>
            {
                new Category{ CategoryId=1, Name="Category 1" },
                new Category{ CategoryId=2, Name="Category 2" },
            };

            //var mockCategoryService = new Mock<ICategoryService>();
            var target = new CategoryController(_categoryServiceMock.Object);
            _categoryServiceMock.Setup(c => c.GetCategories()).Returns(categories);

            // Act
            var actual = target.Index1() as ViewResult;

            // Assert
            Assert.IsNotNull(actual);
            Assert.AreEqual("CategoryList", actual.ViewName);
            Assert.IsNotNull(actual.Model);
            Assert.AreEqual(categories, actual.Model);
            _categoryServiceMock.Verify(c => c.GetCategories(), Times.Once);
        }
    }
}