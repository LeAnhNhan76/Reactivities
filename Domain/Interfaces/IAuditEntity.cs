using System;

public interface IAuditEntity<T> where T : struct
{
    public DateTimeOffset CreatedDate { get; set; }
    public T CreatedBy { get; set; }
    public DateTimeOffset? ModifiedDate { get; set; }
    public T? ModifiedBy { get; set; }
}