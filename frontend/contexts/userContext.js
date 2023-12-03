import React from "react";

// set the defaults
const UserContext = React.createContext({
  user: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik11bUdhNXVhSjVyR3N0M3kzTWp1NyJ9.eyJuaWNrbmFtZSI6InVzZXIyIiwibmFtZSI6InVzZXIyQG1vY2suY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzAzOTNhN2JlNTdkNzg4NWY1MTkwN2Q2OGY3MTNjYjY0P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGdXMucG5nIiwidXBkYXRlZF9hdCI6IjIwMjMtMTItMDJUMTY6MTc6MDguMDE5WiIsImVtYWlsIjoidXNlcjJAbW9jay5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vY3Jvc3MtdHJhaW5lci14LnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJDN1VQR3FqODRhbjhGbzJGdVl6Q0IyU0E2SHdaQzg5eSIsImlhdCI6MTcwMTU2MTkwMCwiZXhwIjoxNzAxNTk3OTAwLCJzdWIiOiJhdXRoMHw2NTUxMmE3MDY0ZTc5MTEzZWZjYTIxM2IiLCJzaWQiOiJUdndaMVdramNXZDVfdnVXa0cyaTVQLTMzbjdqWlh1MyJ9.kqGsjE3cBNedMOcdt1JVeOv1gq7KcMvPBYSbgH-IXjUGcrr2s6hj-MTZ3T3Bt87hSMbqDrsDADB818L7ZC9ARZvzhQd1-llbwn_OL_bIkTnZCuTlLH1-pBhfsem0YKcuXfvvVXFDcy1FDfezh6y8kfgFdeFWHU5su2YxB60Fvz0ZHXaDq8u4JrHn-nfFQ1vqoJhNGmhO7SkKVQFzQNEq4GKuBpuN8b3VLAUXhkpeWXMWP-yoSW4hlK1GyfcnWfs432w0eWqYINV2pefVczb9pUb0ntxfvGIk2GJbDvdQG8GUWC9Zd8SyAyrvttIoVNUh5UckoO5UREmvX463Qg4sdA",
  setUser: () => {}
});

export default UserContext;