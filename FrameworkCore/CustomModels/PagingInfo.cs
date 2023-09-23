using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrameworkCore.Extensions;
using Microsoft.EntityFrameworkCore;

namespace FrameworkCore.CustomModels
{
    public class PagedList<T>
    {
        public int PageIndex { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages => ItemsPerPage == 0 ? 0 : (int)Math.Ceiling((double)TotalItems / ItemsPerPage);
        public List<T> Result { get; set; }

        public PagedList()
        {
            PageIndex = 0;
            ItemsPerPage = 10;
            TotalItems = 0;
            Result = new List<T>();
        }

        public PagedList(IEnumerable<T> colection, int pageIndex, int itemsPerPage, int totalItems)
        {
            PageIndex = pageIndex;
            ItemsPerPage = itemsPerPage;
            Result = colection.ToList();
            TotalItems = totalItems;
        }
    }

    public class PagingParams
    {
        public int PageIndex { get; set; }
        public int ItemsPerPage { get; set; }

        public PagingParams()
        {
            PageIndex = 0;
            ItemsPerPage = 10;
        }
    }
}