﻿using System.ComponentModel.DataAnnotations;

namespace ApiApplicationCore.Dtos
{
    public class ProductsDto
    {
        public int ProductId { get; set; }

        [Required]
        [StringLength(50)]
        public string ProductName { get; set; }

        [Required]
        public string ProductDescription { get; set; }
        [Required]
        public int CategoryId { get; set; }
        public decimal ProductPrice { get; set; }

        [Required]
        public bool InStock { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}
