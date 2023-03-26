using System;

public interface IAuditEntity<T> 
{
    public DateTime CreatedDate { get; set; }
    public T CreatedBy { get; set; }
    public DateTime ModifiedDate { get; set; }
    public T ModifiedBy { get; set; }
}