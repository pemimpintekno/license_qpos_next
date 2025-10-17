"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [keys, setKeys] = useState<any[]>([]);
  const [status, setStatus] = useState("");
  const [loginError, setLoginError] = useState("");
  const [generateMessage, setGenerateMessage] = useState("");
  const [view, setView] = useState<"login" | "dashboard">("login");

  const apiRequest = async (
    endpoint: string,
    method = "GET",
    body: any = null
  ) => {
    const headers: any = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    console.log("token ", token);

    const config: RequestInit = { method, headers };
    if (body) config.body = JSON.stringify(body);

    try {
      // Fix: Use /api/admin instead of /admin
      const response = await fetch(`/api/admin${endpoint}`, config);
      if (response.status === 401) {
        logout();
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error("API Request Error:", error);
      return null;
    }
  };

  const fetchKeys = async () => {
    const endpoint = status ? `/keys?status=${status}` : "/keys";
    const result = await apiRequest(endpoint);
    if (result) setKeys(result);
  };

  const login = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    console.log("newToken ", newToken);
    setToken(newToken);
    setView("dashboard");
    fetchKeys();
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setView("login");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const result = await apiRequest("/login", "POST", data);
    console.log(result);
    if (result?.success) {
      login(result.token);
    } else {
      setLoginError(result?.message || "Login failed.");
    }
  };

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGenerateMessage("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const result = await apiRequest("/keys", "POST", data);
    if (result?.success) {
      setGenerateMessage(
        `✅ Successfully generated key: ${result.data.serialKey}`
      );
      form.reset();
      fetchKeys();
    } else {
      setGenerateMessage(result?.message || "❌ Failed to generate key.");
    }
  };

  const deactivateKey = async (id: string) => {
    if (!confirm("Are you sure you want to deactivate this key?")) return;
    const result = await apiRequest(`/keys/${id}/deactivate`, "POST");
    if (result?.success) fetchKeys();
  };

  const deleteKey = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this key?"))
      return;
    const result = await apiRequest(`/keys/${id}`, "DELETE");
    if (result?.success) fetchKeys();
  };

  useEffect(() => {
    const saved = localStorage.getItem("authToken");
    if (saved) {
      setToken(saved);
      setView("dashboard");
    }
  }, []);

  useEffect(() => {
    if (view === "dashboard") {
      fetchKeys();
    }
  }, [status, view]);

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          License Management System
        </h1>

        {view === "login" ? (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Admin Login
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
              >
                Sign In
              </button>
              {loginError && (
                <p className="text-red-500 text-sm mt-4 text-center">
                  {loginError}
                </p>
              )}
            </form>
          </div>
        ) : (
          <div id="dashboard-section">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Manage License Keys</h2>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Logout
              </button>
            </div>

            {/* Generate Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">Generate New Key</h3>
              <form
                onSubmit={handleGenerate}
                className="flex items-center gap-4"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="customer@example.com"
                  required
                  className="flex-grow block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Generate
                </button>
              </form>
              {generateMessage && (
                <p className="text-sm mt-3">{generateMessage}</p>
              )}
            </div>

            {/* Table Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Existing Keys</h3>
                <div>
                  <label htmlFor="status" className="text-sm font-medium">
                    Filter by status:
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="ml-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="">All</option>
                    <option value="UNUSED">Unused</option>
                    <option value="ACTIVATED">Activated</option>
                    <option value="DEACTIVATED">Deactivated</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Serial Key
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {keys.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          No keys found.
                        </td>
                      </tr>
                    ) : (
                      keys.map((key) => {
                        const colorMap: Record<string, string> = {
                          UNUSED: "bg-blue-100 text-blue-800",
                          ACTIVATED: "bg-green-100 text-green-800",
                          DEACTIVATED: "bg-yellow-100 text-yellow-800",
                        };
                        const color =
                          colorMap[String(key.status)] ||
                          "bg-gray-100 text-gray-800";
                        return (
                          <tr key={key.id}>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {key.email}
                            </td>
                            <td className="px-6 py-4 text-sm font-mono text-gray-600">
                              {key.serialKey}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}
                              >
                                {key.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {key.createdBy?.username || "N/A"}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              {key.status === "ACTIVATED" && (
                                <button
                                  className="text-yellow-600 hover:text-yellow-900 mr-4"
                                  onClick={() => deactivateKey(key.id)}
                                >
                                  Deactivate
                                </button>
                              )}
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={() => deleteKey(key.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
