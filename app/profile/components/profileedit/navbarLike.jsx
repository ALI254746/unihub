// components/LikeDrawer.jsx
import { Drawer } from "@mui/material";

export default function LikeDrawer({ open, toggleDrawer }) {
  const notifications = [
    {
      id: 1,
      timeGroup: "Today",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      name: "jessica_design",
      message: "liked your photo.",
      time: "7m",
      previewImage:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
    },
    {
      id: 2,
      timeGroup: "Today",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      name: "mike_johnson",
      message: "mentioned you in a comment: @yourusername check this out!",
      time: "32m",
      icon: "fa-comment",
    },
    {
      id: 3,
      timeGroup: "Today",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      name: "alex_creative",
      message: "started following you.",
      time: "1h",
      following: true,
    },
    // ... add other notification entries as needed
  ];

  const groupedNotifications = notifications.reduce((acc, curr) => {
    if (!acc[curr.timeGroup]) acc[curr.timeGroup] = [];
    acc[curr.timeGroup].push(curr);
    return acc;
  }, {});

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      PaperProps={{
        sx: {
          width: "100%", // mobilda to‘liq
          height: "100%", // mobilda to‘liq
          "@media (min-width: 640px)": {
            width: 400, // sm dan katta ekranda 400px
          },
        },
      }}
    >
      <div className="bg-[#000] text-white font-sans min-h-screen pb-16">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#000] border-b border-[#262626] h-14 flex items-center justify-between px-4">
          <button onClick={toggleDrawer} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Notifications</h1>
          <div className="w-8" />
        </header>

        {/* Main */}
        <main className="pt-16">
          {Object.entries(groupedNotifications).map(([group, items]) => (
            <section key={group} className="mb-6">
              <h2 className="px-4 py-2 text-sm font-semibold text-[#8e8e8e]">
                {group}
              </h2>
              {items.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start px-4 py-3 border-b border-[#262626]"
                >
                  <div className="relative">
                    <img
                      src={n.avatar}
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-1 text-sm">
                    <p>
                      <span className="font-bold">{n.name}</span> {n.message}{" "}
                      <span className="text-[#8e8e8e]">{n.time}</span>
                    </p>
                  </div>
                  {n.previewImage && (
                    <img
                      src={n.previewImage}
                      alt="preview"
                      className="w-10 h-10 object-cover rounded ml-2"
                    />
                  )}
                  {n.icon && (
                    <i className={`fa-solid ${n.icon} text-[#8e8e8e] ml-2`} />
                  )}
                  {n.following && (
                    <button className="ml-2 px-3 py-1.5 bg-[#0095f6] rounded text-xs font-semibold">
                      Following
                    </button>
                  )}
                </div>
              ))}
            </section>
          ))}
        </main>
      </div>
    </Drawer>
  );
}
