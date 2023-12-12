FROM alpine

RUN apk update

RUN apk add --no-cache \ 
        openssh \
    && ssh-keygen -A \
    && mkdir /root/.ssh \
    && chmod 0700 /root/.ssh \
    && echo "root:" | chpasswd \
    && ln -s /etc/ssh/ssh_host_ed25519_key.pub /root/.ssh/authorized_keys

EXPOSE 8080

CMD ["/usr/sbin/sshd", "-D", "-e", "-p 8080", "-o PermitRootLogin=yes", "-o PermitEmptyPasswords=yes"]
