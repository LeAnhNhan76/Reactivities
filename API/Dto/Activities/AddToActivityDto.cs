using System;

namespace API.Dto
{
    public class AddToActivityDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTimeOffset Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }
}