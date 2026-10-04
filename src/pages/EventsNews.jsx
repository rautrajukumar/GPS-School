export default function EventsNews() {
  return (
    <section className="container mx-auto py-14 px-4">
      <h2 className="text-3xl font-bold mb-6 text-primary">Events & News</h2>
      <div className="mb-8">
        <h3 className="font-semibold text-lg">Upcoming Events</h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Annual Sports Meet – August 20th, 2026</li>
          <li>Children’s Day Celebration – November 14th, 2026</li>
          <li>Parent-Teacher Meet – December 3rd, 2026</li>
        </ul>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold text-lg">Announcements</h3>
        <div className="bg-yellow-100 p-4 rounded mb-2">
          <strong>New!</strong> Admissions for 2026-27 are now open.
        </div>
        <div className="bg-green-100 p-4 rounded mb-2">
          <strong>Result:</strong> GPS won 1st prize in State Drawing
          Competition.
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg">Newsletters</h3>
        <a
          href="/school-newsletter.pdf"
          download
          className="underline text-blue-600"
        >
          Download May 2025 Newsletter (PDF)
        </a>
      </div>
    </section>
  );
}
