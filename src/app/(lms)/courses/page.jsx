"use client"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import Link from "next/link"

export default function CoursesSearchPage() {
  const [q, setQ] = useState("")
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchCourses(query) {
    setLoading(true)
    try {
      const { data } = await api.get(`/course/search`, { params: { q: query || undefined } })
      setItems(data?.data || data?.results || [])
    } catch (e) {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCourses("") }, [])

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <div className="flex gap-2">
        <input className="flex-1 border rounded px-3 py-2" placeholder="Search courses" value={q} onChange={(e)=>setQ(e.target.value)} />
        <button onClick={()=>fetchCourses(q)} className="bg-black text-white rounded px-4">Search</button>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((c) => (
            <Link key={c._id || c.id} href={`/courses/${c._id || c.id}`} className="border rounded p-4 hover:shadow">
              <div className="font-medium">{c.title || c.name}</div>
              {c.subtitle && <div className="text-sm text-gray-600">{c.subtitle}</div>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
