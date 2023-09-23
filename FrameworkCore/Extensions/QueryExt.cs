using System.Collections.Generic;
using System.Linq;

namespace FrameworkCore.Extensions
{
    public static class QueryExt
    {
        public static IQueryable<T> Paging<T>(this IQueryable<T> query, int pageIndex, int itemsPerPage)
        {
            if (pageIndex > 0 && itemsPerPage > 0)
            {
                query = query.Skip((pageIndex - 1) * itemsPerPage).Take(itemsPerPage);
            }
            return query;
        }

        public static IEnumerable<T> Paging<T>(this IEnumerable<T> query, int pageIndex, int itemsPerPage)
        {
            if (pageIndex > 0 && itemsPerPage > 0)
            {
                query = query.Skip((pageIndex - 1) * itemsPerPage).Take(itemsPerPage);
            }
            return query;
        }
    }
}