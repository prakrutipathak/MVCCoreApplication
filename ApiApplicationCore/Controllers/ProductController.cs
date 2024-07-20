using ApiApplicationCore.Dtos;
using ApiApplicationCore.Models;
using ApiApplicationCore.Services.Contract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiApplicationCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("GetAllProducts")]
        public IActionResult GetAllProducts()
        { 
            var response = _productService.GetAllProducts();

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost("AddProduct")]
        public IActionResult AddProduct(AddProductDto addProduct)
        {
            var product = new Product
            {
                CategoryId = addProduct.CategoryId,
                ProductName = addProduct.ProductName,   
                ProductDescription= addProduct.ProductDescription,
                ProductPrice = addProduct.ProductPrice,
                InStock = addProduct.InStock,
                IsActive = addProduct.IsActive,
            };

            var result = _productService.AddProduct(product);
            return !result.Success ? BadRequest(result) : Ok(result);
        }
        [HttpGet("GetProductById/{id}")]
        public IActionResult GetProductById(int id)
        {
            var response = _productService.GetProductById(id);
            if (!response.Success)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
      

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteConfirmed(int id)
        {
            if (id > 0)
            {
                var result = _productService.DeleteProduct(id);
                return !result.Success ? BadRequest(result) : Ok(result);
            }
            else
            {
                return BadRequest("Please enter proper data");
            }
        }

        [HttpPut("Edit")]
        public IActionResult Edit(ProductsDto productDto)
        {
            var product = new Product()
            {
                ProductId = productDto.ProductId,
                CategoryId = productDto.CategoryId,
                ProductName = productDto.ProductName,
                ProductDescription = productDto.ProductDescription,
                ProductPrice = productDto.ProductPrice,
                InStock = productDto.InStock,
                IsActive = productDto.IsActive,
            };
            var result = _productService.UpdateProduct(product);
            return !result.Success ? BadRequest(result) : Ok(result);
        }

    }
}
