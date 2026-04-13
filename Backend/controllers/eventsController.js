import Event from "../model/Event.js";

const VALID_STATUSES = ["new_request", "active", "completed", "cancelled"];

// @desc    Get events (optional status filter)
// @route   GET /api/events?status=new_request
// @access  Private (Admin/Superadmin)
export const getEvents = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const events = await Event.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: events.length, events });
  } catch (error) {
    console.error("Get Events Error:", error);
    res.status(500).json({ message: "Server Error fetching events" });
  }
};

// @desc    Update event status
// @route   PATCH /api/events/:id/status
// @access  Private (Admin/Superadmin)
export const updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status specified" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.status = status;
    await event.save();

    res
      .status(200)
      .json({ success: true, message: "Event status updated", event });
  } catch (error) {
    console.error("Update Event Status Error:", error);
    res.status(500).json({ message: "Server Error updating event status" });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Admin/Superadmin)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ message: "Server Error deleting event" });
  }
};

// @desc    Get event summary for dashboard (all authenticated users)
// @route   GET /api/events/summary
// @access  Private (Any authenticated user)
export const getEventsSummary = async (req, res) => {
  try {
    const events = await Event.find({})
      .sort({ createdAt: -1 })
      .select("firstName lastName service company status createdAt");

    const total = events.length;
    const active = events.filter((e) => e.status === "active").length;
    const completed = events.filter((e) => e.status === "completed").length;
    const complianceScore = total === 0 ? 0 : Math.round((completed / total) * 100);

    res.status(200).json({
      success: true,
      totals: {
        total,
        active,
        completed,
        complianceScore,
      },
      events,
    });
  } catch (error) {
    console.error("Get Events Summary Error:", error);
    res.status(500).json({ message: "Server Error fetching summary" });
  }
};
