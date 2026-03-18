import React, { useMemo, useState } from "react";

const currentUser = {
    id: 1,
    name: "Wenli",
    status: "online",
};

const initialConversations = [
    {
        id: 1,
        name: "Alice Chen",
        type: "direct",
        online: true,
        unread: 2,
        lastMessage: "Can you send me the updated design?",
        lastTime: "10:24 AM",
        messages: [
            {
                id: 1,
                sender: "Alice Chen",
                text: "Hi! How is the new chat UI going?",
                time: "10:10 AM",
                mine: false,
            },
            {
                id: 2,
                sender: "Wenli",
                text: "Pretty well. I’m polishing the sidebar and message area now.",
                time: "10:13 AM",
                mine: true,
            },
            {
                id: 3,
                sender: "Alice Chen",
                text: "Nice. Can you send me the updated design?",
                time: "10:24 AM",
                mine: false,
            },
        ],
    },
    {
        id: 2,
        name: "Project Team",
        type: "group",
        online: false,
        unread: 0,
        lastMessage: "Leo: Let’s demo it tomorrow afternoon.",
        lastTime: "Yesterday",
        messages: [
            {
                id: 1,
                sender: "Leo",
                text: "Let’s demo it tomorrow afternoon.",
                time: "Yesterday",
                mine: false,
            },
            {
                id: 2,
                sender: "Wenli",
                text: "Works for me. I’ll finish the React UI first.",
                time: "Yesterday",
                mine: true,
            },
        ],
    },
    {
        id: 3,
        name: "David Kim",
        type: "direct",
        online: false,
        unread: 0,
        lastMessage: "Thanks! This layout looks much cleaner.",
        lastTime: "Monday",
        messages: [
            {
                id: 1,
                sender: "David Kim",
                text: "Thanks! This layout looks much cleaner.",
                time: "Monday",
                mine: false,
            },
        ],
    },
    {
        id: 4,
        name: "Design Review",
        type: "group",
        online: true,
        unread: 4,
        lastMessage: "Emma: The dark theme feels really nice.",
        lastTime: "09:02 AM",
        messages: [
            {
                id: 1,
                sender: "Emma",
                text: "The dark theme feels really nice.",
                time: "09:02 AM",
                mine: false,
            },
            {
                id: 2,
                sender: "Wenli",
                text: "I want it to feel soft, clean, and modern.",
                time: "09:05 AM",
                mine: true,
            },
        ],
    },
];

function getInitials(name) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function panelStyle() {
    return {
        background: "rgba(15, 23, 42, 0.72)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        backdropFilter: "blur(14px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    };
}

function iconButtonStyle(active) {
    return {
        width: 44,
        height: 44,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.08)",
        background: active ? "#22d3ee" : "rgba(255,255,255,0.06)",
        color: active ? "#0f172a" : "#cbd5e1",
        cursor: "pointer",
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
}

function avatarStyle() {
    return {
        width: 46,
        height: 46,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        color: "#e2e8f0",
        flexShrink: 0,
    };
}

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("wenli@example.com");
    const [password, setPassword] = useState("password123");
    const [search, setSearch] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [conversations, setConversations] = useState(initialConversations);
    const [activeId, setActiveId] = useState(1);

    const filteredConversations = useMemo(() => {
        return conversations.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, conversations]);

    const activeConversation =
        conversations.find((conversation) => conversation.id === activeId) ||
        conversations[0];

    const handleSend = () => {
        if (!messageInput.trim()) return;

        const newMessage = {
            id: Date.now(),
            sender: currentUser.name,
            text: messageInput.trim(),
            time: "Now",
            mine: true,
        };

        setConversations((prev) =>
            prev.map((conversation) =>
                conversation.id === activeId
                    ? {
                        ...conversation,
                        lastMessage: messageInput.trim(),
                        lastTime: "Now",
                        messages: [...conversation.messages, newMessage],
                    }
                    : conversation
            )
        );

        setMessageInput("");
    };

    if (!isLoggedIn) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                        "radial-gradient(circle at top left, rgba(34,211,238,0.18), transparent 28%), radial-gradient(circle at bottom right, rgba(168,85,247,0.16), transparent 28%), linear-gradient(135deg, #020617, #0f172a, #111827)",
                    color: "white",
                    padding: 24,
                    fontFamily:
                        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: 1100,
                        display: "grid",
                        gridTemplateColumns: "1.15fr 0.85fr",
                        gap: 32,
                        alignItems: "center",
                    }}
                >
                    <div style={{ color: "#e2e8f0" }}>
                        <div
                            style={{
                                display: "inline-block",
                                padding: "8px 14px",
                                borderRadius: 999,
                                background: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                fontSize: 14,
                                marginBottom: 20,
                            }}
                        >
                            QQChat React UI Demo
                        </div>
                        <h1
                            style={{
                                fontSize: 52,
                                lineHeight: 1.1,
                                margin: "0 0 18px 0",
                                color: "#f8fafc",
                            }}
                        >
                            A modern chat interface for your Java chat project.
                        </h1>
                        <p
                            style={{
                                fontSize: 18,
                                lineHeight: 1.8,
                                maxWidth: 620,
                                color: "#cbd5e1",
                                margin: 0,
                            }}
                        >
                            Start with a polished frontend now, then connect it to your real
                            backend later. This version uses local mock data and is easy to
                            upgrade to real APIs.
                        </p>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                gap: 16,
                                marginTop: 28,
                                maxWidth: 620,
                            }}
                        >
                            {[
                                "Responsive chat layout",
                                "Dark modern visual style",
                                "Reusable React structure",
                                "Easy to connect APIs later",
                            ].map((item) => (
                                <div key={item} style={{ ...panelStyle(), padding: 18 }}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        style={{ ...panelStyle(), padding: 32, maxWidth: 430, width: "100%" }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 14,
                                marginBottom: 28,
                            }}
                        >
                            <div
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 18,
                                    background: "rgba(34,211,238,0.18)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 24,
                                }}
                            >
                                💬
                            </div>
                            <div>
                                <div
                                    style={{ fontSize: 28, fontWeight: 700, color: "#f8fafc" }}
                                >
                                    Welcome back
                                </div>
                                <div style={{ color: "#94a3b8", fontSize: 14 }}>
                                    Sign in to continue to QQChat
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "grid", gap: 18 }}>
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: 8,
                                        color: "#cbd5e1",
                                        fontSize: 14,
                                    }}
                                >
                                    Email
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    style={{
                                        width: "100%",
                                        height: 48,
                                        borderRadius: 16,
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        background: "rgba(255,255,255,0.06)",
                                        color: "white",
                                        padding: "0 14px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: 8,
                                        color: "#cbd5e1",
                                        fontSize: 14,
                                    }}
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    style={{
                                        width: "100%",
                                        height: 48,
                                        borderRadius: 16,
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        background: "rgba(255,255,255,0.06)",
                                        color: "white",
                                        padding: "0 14px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setIsLoggedIn(true)}
                            style={{
                                width: "100%",
                                height: 50,
                                marginTop: 24,
                                borderRadius: 16,
                                border: "none",
                                background: "#22d3ee",
                                color: "#0f172a",
                                fontWeight: 700,
                                fontSize: 16,
                                cursor: "pointer",
                            }}
                        >
                            Sign in
                        </button>

                        <p
                            style={{
                                color: "#94a3b8",
                                fontSize: 13,
                                textAlign: "center",
                                marginTop: 14,
                            }}
                        >
                            Demo only. Uses local mock data for now.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "radial-gradient(circle at top left, rgba(34,211,238,0.08), transparent 25%), radial-gradient(circle at bottom right, rgba(168,85,247,0.08), transparent 25%), linear-gradient(135deg, #020617, #0f172a, #111827)",
                color: "white",
                padding: 18,
                boxSizing: "border-box",
                fontFamily:
                    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "88px 320px minmax(0, 1fr)",
                    gap: 16,
                    height: "calc(100vh - 36px)",
                }}
            >
                <div
                    style={{
                        ...panelStyle(),
                        padding: "20px 0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 14,
                        }}
                    >
                        <div
                            style={{
                                width: 52,
                                height: 52,
                                borderRadius: 18,
                                background: "rgba(34,211,238,0.18)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 24,
                            }}
                        >
                            💬
                        </div>
                        <button style={iconButtonStyle(true)}>💭</button>
                        <button style={iconButtonStyle(false)}>👥</button>
                        <button style={iconButtonStyle(false)}>⚙️</button>
                        <button style={iconButtonStyle(false)}>🌙</button>
                    </div>

                    <button
                        onClick={() => setIsLoggedIn(false)}
                        style={iconButtonStyle(false)}
                    >
                        ⎋
                    </button>
                </div>

                <div
                    style={{
                        ...panelStyle(),
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            padding: 20,
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 16,
                            }}
                        >
                            <div>
                                <div style={{ fontSize: 24, fontWeight: 700 }}>Chats</div>
                                <div style={{ fontSize: 14, color: "#94a3b8" }}>
                                    Your recent conversations
                                </div>
                            </div>
                            <div
                                style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: "50%",
                                    background: "rgba(34,211,238,0.18)",
                                    color: "#a5f3fc",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                }}
                            >
                                {getInitials(currentUser.name)}
                            </div>
                        </div>

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search conversations"
                            style={{
                                width: "100%",
                                height: 44,
                                borderRadius: 16,
                                border: "1px solid rgba(255,255,255,0.1)",
                                background: "rgba(255,255,255,0.06)",
                                color: "white",
                                padding: "0 14px",
                                outline: "none",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <div
                        style={{
                            overflowY: "auto",
                            padding: 12,
                            display: "grid",
                            gap: 10,
                        }}
                    >
                        {filteredConversations.map((conversation) => {
                            const active = activeId === conversation.id;
                            return (
                                <button
                                    key={conversation.id}
                                    onClick={() => setActiveId(conversation.id)}
                                    style={{
                                        textAlign: "left",
                                        borderRadius: 18,
                                        border: active
                                            ? "1px solid rgba(34,211,238,0.26)"
                                            : "1px solid transparent",
                                        background: active
                                            ? "rgba(34,211,238,0.14)"
                                            : "rgba(255,255,255,0.03)",
                                        padding: 14,
                                        color: "white",
                                        cursor: "pointer",
                                    }}
                                >
                                    <div
                                        style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                                    >
                                        <div style={{ position: "relative" }}>
                                            <div style={avatarStyle()}>
                                                {getInitials(conversation.name)}
                                            </div>
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    right: 0,
                                                    bottom: 0,
                                                    width: 11,
                                                    height: 11,
                                                    borderRadius: "50%",
                                                    background: conversation.online
                                                        ? "#34d399"
                                                        : "#64748b",
                                                    border: "2px solid #0f172a",
                                                }}
                                            />
                                        </div>

                                        <div style={{ minWidth: 0, flex: 1 }}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    gap: 10,
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontWeight: 600,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {conversation.name}
                                                </div>
                                                <div
                                                    style={{
                                                        color: "#94a3b8",
                                                        fontSize: 12,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    {conversation.lastTime}
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    gap: 10,
                                                    marginTop: 6,
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        color: "#94a3b8",
                                                        fontSize: 14,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {conversation.lastMessage}
                                                </div>
                                                {conversation.unread > 0 && (
                                                    <div
                                                        style={{
                                                            minWidth: 20,
                                                            height: 20,
                                                            padding: "0 6px",
                                                            borderRadius: 999,
                                                            background: "#22d3ee",
                                                            color: "#0f172a",
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {conversation.unread}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div
                    style={{
                        ...panelStyle(),
                        overflow: "hidden",
                        display: "grid",
                        gridTemplateRows: "auto 1fr auto",
                    }}
                >
                    <div
                        style={{
                            padding: "18px 20px",
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 12,
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}
                        >
                            <div style={{ position: "relative" }}>
                                <div style={avatarStyle()}>
                                    {getInitials(activeConversation.name)}
                                </div>
                                <span
                                    style={{
                                        position: "absolute",
                                        right: 0,
                                        bottom: 0,
                                        width: 11,
                                        height: 11,
                                        borderRadius: "50%",
                                        background: activeConversation.online
                                            ? "#34d399"
                                            : "#64748b",
                                        border: "2px solid #0f172a",
                                    }}
                                />
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <div
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 700,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {activeConversation.name}
                                </div>
                                <div
                                    style={{
                                        color: "#94a3b8",
                                        fontSize: 14,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {activeConversation.online ? "Online now" : "Offline"} ·{" "}
                                    {activeConversation.type === "group"
                                        ? "Group chat"
                                        : "Direct message"}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: 10 }}>
                            <button style={iconButtonStyle(false)}>📞</button>
                            <button style={iconButtonStyle(false)}>🎥</button>
                            <button style={iconButtonStyle(false)}>⋯</button>
                        </div>
                    </div>

                    <div style={{ overflowY: "auto", padding: "22px 24px" }}>
                        <div style={{ maxWidth: 900, margin: "0 auto" }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    marginBottom: 20,
                                }}
                            >
                                <div
                                    style={{
                                        height: 1,
                                        flex: 1,
                                        background: "rgba(255,255,255,0.08)",
                                    }}
                                />
                                <div
                                    style={{ color: "#64748b", fontSize: 12, letterSpacing: 2 }}
                                >
                                    TODAY
                                </div>
                                <div
                                    style={{
                                        height: 1,
                                        flex: 1,
                                        background: "rgba(255,255,255,0.08)",
                                    }}
                                />
                            </div>

                            <div style={{ display: "grid", gap: 14 }}>
                                {activeConversation.messages.map((message) => (
                                    <div
                                        key={message.id}
                                        style={{
                                            display: "flex",
                                            justifyContent: message.mine ? "flex-end" : "flex-start",
                                        }}
                                    >
                                        <div
                                            style={{
                                                maxWidth: "68%",
                                                padding: "14px 16px",
                                                borderRadius: 24,
                                                borderBottomRightRadius: message.mine ? 8 : 24,
                                                borderBottomLeftRadius: message.mine ? 24 : 8,
                                                background: message.mine
                                                    ? "#22d3ee"
                                                    : "rgba(255,255,255,0.08)",
                                                color: message.mine ? "#0f172a" : "#f8fafc",
                                                border: message.mine
                                                    ? "none"
                                                    : "1px solid rgba(255,255,255,0.08)",
                                                boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
                                            }}
                                        >
                                            {!message.mine && (
                                                <div
                                                    style={{
                                                        color: "#67e8f9",
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        marginBottom: 6,
                                                    }}
                                                >
                                                    {message.sender}
                                                </div>
                                            )}
                                            <div style={{ fontSize: 14, lineHeight: 1.7 }}>
                                                {message.text}
                                            </div>
                                            <div
                                                style={{
                                                    marginTop: 8,
                                                    fontSize: 11,
                                                    color: message.mine
                                                        ? "rgba(15,23,42,0.75)"
                                                        : "#94a3b8",
                                                    display: "flex",
                                                    justifyContent: message.mine
                                                        ? "flex-end"
                                                        : "flex-start",
                                                }}
                                            >
                                                {message.time}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            padding: 18,
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        <div
                            style={{
                                maxWidth: 900,
                                margin: "0 auto",
                                display: "flex",
                                gap: 12,
                                alignItems: "center",
                            }}
                        >
                            <button style={iconButtonStyle(false)}>📎</button>
                            <button style={iconButtonStyle(false)}>😊</button>
                            <input
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSend();
                                    }
                                }}
                                placeholder="Type your message..."
                                style={{
                                    flex: 1,
                                    height: 48,
                                    borderRadius: 16,
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    background: "rgba(255,255,255,0.06)",
                                    color: "white",
                                    padding: "0 14px",
                                    outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    height: 48,
                                    padding: "0 18px",
                                    borderRadius: 16,
                                    border: "none",
                                    background: "#22d3ee",
                                    color: "#0f172a",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}