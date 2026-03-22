import { useState } from "react";
import { PenSquare, ImagePlus, Star } from "lucide-react";

export default function ExplorePage() {
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "Trip to Goa",
            content: "Amazing beaches, great vibes, unforgettable sunsets!",
            author: "Manas",
        },
    ]);

    const [form, setForm] = useState({
        title: "",
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title || !form.content) return;

        const newBlog = {
            id: Date.now(),
            title: form.title,
            content: form.content,
            author: "You",
        };

        setBlogs([newBlog, ...blogs]);
        setForm({ title: "", content: "" });
    };

    return (
        <div className="bg-[#f5f1ec] min-h-screen px-6 py-10">
            {/* HEADER */}
            <div className="flex items-center gap-2 mb-8">
                <PenSquare className="text-red-800" />
                <h1 className="text-3xl font-bold text-red-900">
                    Share Your Travel Story
                </h1>
            </div>

            {/* BLOG FORM */}
            <div className="bg-white p-6 rounded-2xl shadow-md mb-10 max-w-2xl">
                <h2 className="text-lg font-semibold text-red-900 mb-4">
                    Write a Blog
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Blog Title"
                        className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-red-200"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                    />

                    <textarea
                        placeholder="Share your experience..."
                        rows={4}
                        className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-red-200"
                        value={form.content}
                        onChange={(e) =>
                            setForm({ ...form, content: e.target.value })
                        }
                    />

                    {/* IMAGE BUTTON (UI only) */}
                    <button
                        type="button"
                        className="flex items-center gap-2 text-sm text-gray-600"
                    >
                        <ImagePlus size={18} />
                        Add Image
                    </button>

                    <button
                        type="submit"
                        className="bg-red-800 text-white px-6 py-2 rounded-full hover:bg-red-900"
                    >
                        Publish
                    </button>
                </form>
            </div>

            {/* BLOG LIST */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
                    >
                        <h3 className="text-lg font-semibold text-red-900">
                            {blog.title}
                        </h3>

                        <p className="text-sm text-gray-500 mb-2">
                            by {blog.author}
                        </p>

                        <p className="text-gray-700 text-sm">
                            {blog.content}
                        </p>

                        <button className="mt-4 flex items-center gap-1 text-sm text-red-800">
                            <Star size={16} />
                            Like
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}