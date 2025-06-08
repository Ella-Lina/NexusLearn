import { dbService } from "../dbService.mjs";

function getAvailableYears(events) {
  const years = new Set(
    events.map((event) => new Date(event.date).getFullYear())
  );
  return Array.from(years).sort((a, b) => b - a);
}

function getEvents(req, res) {
  dbService.getEvents((err, events) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).send("Error loading events.");
    }

    const today = new Date();

    const formatted = events.map((event) => {
      const dateObj = new Date(event.date);
      return {
        ...event,
        formattedDate: dateObj.toLocaleDateString("en-GB"),
        isUpcoming: dateObj >= today,
      };
    });

    res.render("events", {
      title: "Events",
      events: formatted,
      selectedYear: new Date().getFullYear(),
      years: getAvailableYears(events),
    });
  });
}

function getEventById(req, res) {
  const id = req.params.id;
  dbService.getEventById(id, (err, event) => {
    if (err) {
      console.error("Error fetching event:", err);
      return res.status(500).send("Error loading event.");
    }
    if (!event) {
      return res.status(404).send("Event not found.");
    }

    const today = new Date();
    const eventDate = new Date(event.date);
    const formattedEvent = {
      ...event,
      isUpcoming: eventDate >= today,
      formattedDate: eventDate.toLocaleDateString("en-GB"),
    };

    res.render("event", {
      title: formattedEvent.title,
      event: formattedEvent,
    });
  });
}

function filterEvents(req, res) {
  const { year, category } = req.query;

  dbService.filterEvents(year, category, (err, events) => {
    if (err) {
      console.error("Error filtering events:", err);
      return res.status(500).send("Error filtering events.");
    }

    const today = new Date();

    const formatted = events.map((event) => {
      const dateObj = new Date(event.date);
      return {
        ...event,
        formattedDate: dateObj.toLocaleDateString("en-GB"),
        isUpcoming: dateObj >= today,
      };
    });

    res.json(formatted);
  });
}

export default {
  getEvents,
  getEventById,
  filterEvents,
};
