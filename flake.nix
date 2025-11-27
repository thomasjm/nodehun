{
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/master";

  outputs = { self, flake-utils, nixpkgs }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
        {
          devShells = {
            default = pkgs.mkShell {
              buildInputs = with pkgs; [
                nodejs
              ];
            };
          };
        }
    );
}
