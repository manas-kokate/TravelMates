import React, { useState } from "react";
import {
    MapPin,
    Calendar,
    Search,
    ArrowRight,
    Filter
} from "lucide-react";
import TravelBlogs from "./TravelBlogs";

const blogsData = [
    {
        id: 1,
        title: "Hidden Trails of Coorg: A Monsoon Trek",
        location: "Coorg",
        date: "2025-03-12",
        readTime: "6 min read",
        category: "Nature",
        author: "Ananya Sharma",
        quote: "The monsoon made this journey unforgettable.",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        desc: "The rain doesn't stop the adventure — it amplifies it. Discover misty forest paths of Coorg."
    },
    {
        id: 2,
        title: "Sunsets in Santorini",
        location: "Santorini",
        date: "2025-02-10",
        readTime: "5 min read",
        category: "Romantic",
        author: "Rahul Mehta",
        quote: "I’ve never seen colors like this before.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        desc: "Experience breathtaking sunsets over white-washed houses and blue domes."
    },
    {
        id: 3,
        title: "Into the Heart of Manali",
        location: "Manali",
        date: "2025-01-18",
        readTime: "7 min read",
        category: "Adventure",
        author: "Priya Verma",
        quote: "Snow, silence, and pure peace.",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766",
        desc: "A snowy escape into the Himalayas filled with adventure and calmness."
    },
    {
        id: 4,
        title: "Exploring the Streets of Tokyo",
        location: "Tokyo",
        date: "2025-03-01",
        readTime: "4 min read",
        category: "City Life",
        author: "Karan Gupta",
        quote: "Every street felt like a different world.",
        image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
        desc: "From neon lights to quiet temples, Tokyo offers a unique contrast."
    },
    {
        id: 5,
        title: "Desert Safari in Dubai",
        location: "Dubai",
        date: "2025-02-22",
        readTime: "5 min read",
        category: "Adventure",
        author: "Sneha Kapoor",
        quote: "The desert has its own kind of magic.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        desc: "Experience thrilling dune bashing and serene desert sunsets."
    },
    {
        id: 6,
        title: "Backwaters of Kerala",
        location: "Kerala",
        date: "2025-01-28",
        readTime: "6 min read",
        category: "Nature",
        author: "Arjun Nair",
        quote: "Life slows down beautifully here.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        desc: "Cruise through serene backwaters and lush greenery."
    },
    {
        id: 7,
        title: "Paris: The City of Lights",
        location: "Paris",
        date: "2025-02-05",
        readTime: "5 min read",
        category: "Romantic",
        author: "Meera Joshi",
        quote: "Every corner felt like a movie scene.",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
        desc: "Explore iconic landmarks, cafes, and romantic vibes in Paris."
    }
];

export default function Blogs() {
    const [search, setSearch] = useState("");
    const [place, setPlace] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("latest");

    const filteredBlogs = blogsData
        .filter((b) =>
            b.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((b) => (place ? b.location === place : true))
        .filter((b) => (category ? b.category === category : true))
        .sort((a, b) =>
            sort === "latest"
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date)
        );

    return (
        <section className="min-h-screen bg-[#FFF8F0] text-[#5E0006] px-6 md:px-16 py-16">

            {/* BLOG LIST */}
            <TravelBlogs />

        </section>
    );
}