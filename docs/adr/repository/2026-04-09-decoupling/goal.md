1. The three core BI capabilities now live under packages. They are atomic BI and Headless BI components that can be embedded into many applications, but I ultimately need to build my own BI platform to validate their capabilities. I have now finished setting up `vbi_be` and `vbi_fe`, so the prototype of a BI platform is already in place.
2. My next-stage goal is to create a `vbi_tui` application and use the CLI to control resource interactions, achieving true platform-level Headless BI.
3. CRUD for chart and insight is currently deeply coupled. How should we design it to remove that coupling?
4. Generate a `discussion.md` file.
