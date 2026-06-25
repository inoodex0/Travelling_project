'use client';

const blogs = [
  {
    title: "The Ultimate Guide to Hiking in the Alps",
    date: "June 25, 2026",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
    excerpt: "Discover the best trails and hidden spots in the heart of the Alps."
  },
  {
    title: "Top 10 Wildlife Safaris in Africa",
    date: "June 24, 2026",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop",
    excerpt: "Get ready for an adventure of a lifetime in the African wild."
  },
  {
    title: "Why Scuba Diving Changes Your Perspective",
    date: "June 23, 2026",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    excerpt: "Underwater worlds offer more than just beauty; they offer serenity."
  }
];

export default function LatestBlog() {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>Latest Blog</h2>
        <p style={{ color: '#888', fontStyle: 'italic', marginBottom: '50px' }}>"The trips that offered by local guides or experts for travellers"</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {blogs.map((blog, index) => (
            <div key={index} style={{ backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }}>
              <img src={blog.img} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px', textAlign: 'left' }}>
                <p style={{ color: '#00c2cb', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>{blog.date}</p>
                <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>{blog.title}</h3>
                <p style={{ fontSize: '14px', color: '#666' }}>{blog.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}