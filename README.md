# Expo update server for orion

### Initial Setup Instructions - DB
1. Setup infisical secrets and link to fly project.
2. Follow the instructions in dockerfile and enable initial setup command while commenting out the one mentioned below it.
3. Deploy on fly using `fly deploy -c fly.[environment].toml`
4. SSH into the machine using `fly ssh console -c fly.[environment].toml`
5. Run the following commands
    ```
    mongosh

    use admin

    db.createUser({ user: "<username>", pwd: "<password>", roles: [{ role: "userAdminAnyDatabase", db: "admin"}, "readWriteAnyDatabase" ]})

    exit
    exit
    ```
6. Comment out the initial setup instructions from the Dockerfile and restore the other line.
7. Deploy again on fly using 
    ```
    fly deploy -c=fly.[environment].toml --no-cache
    ```
8. Your connection string to use now is:
    ```
    mongodb://<username>:<password>@<fly-app-name>.internal:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=mongosh+2.3.0
    ```

### Initial Setup Instructions - API
1. Setup infisical secrets and link to fly project.
2. Deploy on fly using `fly deploy -c fly.[environment].toml`

### Debugging
1. OTA update stuck during upload
- Check logs on fly to identify what step of upload its stuck at.
- Give it some time, sometimes it takes upto 10 minutes to process an upload. More than 10 minutes usually indicates something is wrong.
- SSH into the machine using `fly ssh console -c fly.[environment].toml`
- Ensure that the `/data/updates` and `/data/uploads` exists, if not then create the directories using `mkdir`
- Ensure that the `/data/updates` and `/data/uploads` folders are owned by the `node` process. To check run the `ls -la` command. 
- If not owned by `node` process, run the below commands to change the owner
    ```sh
    chown node:node /data/updates
    chown node:node /data/uploads
    ```
- Ensure that the `/uploads` and `/updates` symlinks exist, at root. If not then run the below commands
    ```sh
    ln -s /data/updates /updates
    ln -s /data/uploads /uploads
    ```
- Ensure that the symlinks are also owned by `node` process
    ```sh
    chown node:node /uploads -h
    chown node:node /updates -h
    ```
- Restart the server -> Stop the machine and start the machine
- If it does not accept uploads even after above, then just redeploy the server using `fly deploy fly.[environment].toml`