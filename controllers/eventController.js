const { dbService } = require("../dbService");

exports.getEvents = (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  dbService.filterEvents(year, null, (err, events) => {
    if (err) {
      console.error("Error fetching events:", err);
      return res.status(500).send("Error loading events.");
    }
    console.log("Fetched events:", events);
    const today = new Date();
    const eventsWithStatus = events.map((event) => {
      const eventDate = new Date(event.date);
      return {
        ...event,
        isUpcoming: eventDate >= today,
        formattedDate: eventDate.toLocaleDateString("en-GB"),
      };
    });

    dbService.getEvents((err, allEvents) => {
      if (err) {
        console.error("Error fetching all events for years:", err);
        return res.status(500).send("Error loading events.");
      }
      const years = getAvailableYears(allEvents);
      res.render("events", {
        title: "Events",
        events: eventsWithStatus,
        selectedYear: year,
        years: years || [],
      });
    });
  });
};

exports.getEventById = (req, res) => {
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
    res.render("event", {
      title: event.title,
      event: {
        ...event,
        isUpcoming: eventDate >= today,
        formattedDate: eventDate.toLocaleDateString("en-GB"),
      },
    });
  });
};

exports.filterEvents = (req, res) => {
  const { year, category } = req.query;
  dbService.filterEvents(year, category, (err, events) => {
    if (err) {
      console.error("Error filtering events:", err);
      return res.status(500).json({ error: "Error filtering events." });
    }
    const today = new Date();
    const eventsWithStatus = events.map((event) => {
      const eventDate = new Date(event.date);
      return {
        ...event,
        isUpcoming: eventDate >= today,
        formattedDate: eventDate.toLocaleDateString("en-GB"),
      };
    });
    res.json(eventsWithStatus);
  });
};

function getAvailableYears(events) {
  const years = new Set(
    events.map((event) => new Date(event.date).getFullYear())
  );
  return Array.from(years).sort((a, b) => b - a);
}
