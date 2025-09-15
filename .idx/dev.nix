{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
     pkgs.go
     pkgs.python311
     pkgs.python311Packages.pip
     pkgs.nodejs_20
     pkgs.helm
     pkgs.nodePackages.nodemon
     pkgs.docker
     pkgs.dig.dnsutils
     pkgs.eksctl
     pkgs.openssl_3_3.bin
     pkgs.prometheus.cli 
     pkgs.docker-client
     pkgs.openssh
     pkgs.k3s
     pkgs.kubectl
     pkgs.tenv
     pkgs.docker-compose
     pkgs.ansible
     pkgs.sudo
     pkgs.awscli
     pkgs.busybox
     pkgs.nano
     pkgs.grafana
  ];

  env = {};

  idx = {
    extensions = [
      # add more if needed
    ];

    previews = {
      enable = true;
      previews = {
        auth-service = {
          command = [ "npm" "start" ];
          manager = "web";
          env = {
            PORT = "$PORT"; # IDX injects a random port, and passes it to your app
          };
        };
      };
    };

    workspace = {
      onCreate = {
        setup-node = "npm install";
      };
      onStart = {
        dev-preview = "npm run start";
      };
    };
  };
}
