module ApplicationHelper
  def paginate_info(collection)
    current, total, per_page = collection.current_page, collection.total_pages, collection.limit_value

    {
      pagination: {
        current: current,
        previous: (current > 1 ? (current - 1) : nil),
        next: (current == total ? nil : (current + 1)),
        per_page: per_page,
        pages: total,
        count: collection.total_count,
      }
    }
  end
end
